import {Config} from "../config/Config.js";
import {Armor} from "./Armor/Armor.js";
import {WeaponView} from "./Weapon/WeaponView.js";
import {GameView} from "./GameView.js";

/**
 * Class Player view
 *
 * @property {HTMLImageElement} spriteSheet
 **/
export class PlayerView extends GameView {

    /**
     *
     * @param {Observer} receiveDamageObserver
     * @param {CanvasRenderingContext2D} context
     * @param {string} spriteSheetSrc
     */
    constructor(receiveDamageObserver, context, spriteSheetSrc) {
        super(context);

        this.receiveDamageObserver = receiveDamageObserver;
        this.chestArmorView = new Armor('./ressources/chestArmor.png');
        this.legsArmorView = new Armor('./ressources/legsArmor.png');
        this.footArmorView = new Armor('./ressources/footArmor.png');

        this.weaponView = null;

        // Bind method
        this.animateDamage = this.animateDamage.bind(this);
        this.receiveDamageObserver.subscribe(this.animateDamage);
    }

    /**
     * Add weapon to the player
     * @param {WeaponView} weapon
     **/
    setWeapon(weapon) {
        this.weapon = weapon;
    }

    /**
     *
     * @param {PlayerModel} playerModel
     * @param {MapModel} mapModel
     * @param {{x: number, y: number}} position
     * @param {number} playerDirection
     **/
    update(playerModel, mapModel, position, playerDirection, ) {
        const numberTile = playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        if(playerModel.spriteSheet) {
            this.ctx.drawImage(playerModel.spriteSheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        }

        if(this.chestArmorView && this.legsArmorView && this.footArmorView) {
            this.chestArmorView.draw(this.ctx, sourceX, sourceY, position.x, position.y);
            this.legsArmorView.draw(this.ctx, sourceX, sourceY, position.x, position.y);
            this.footArmorView.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        }

        if(this.weapon) {
            this.weapon.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        }

        //this.isDead();

    }

    /**
     * Animate player when receive damage
     **/
    animateDamage() {
        let i = 0;
        let lastImagePlayer = this.spriteSheet;

        let lastChestImage = this.chestArmorView.spritesheet;
        let lastLegsImage = this.legsArmorView.spritesheet;
        let lastFootImage = this.footArmorView.spritesheet;

        // Animation disparition player
        let animation = setInterval(() => {
            this.spriteSheet = this.spriteSheet === null ? lastImagePlayer : null;
            this.chestArmorView.spritesheet = this.chestArmorView.spritesheet === null ? lastChestImage : null;
            this.legsArmorView.spritesheet = this.legsArmorView.spritesheet === null ? lastLegsImage : null;
            this.footArmorView.spritesheet = this.footArmorView.spritesheet === null ? lastFootImage : null;
            if(i > 4) {
                clearInterval(animation);
            }
            i++;
        }, 250)

        this.spriteSheet = lastImagePlayer;
        this.chestArmorView.spritesheet = lastChestImage;
        this.legsArmorView.spritesheet = lastLegsImage;
        this.footArmorView.spritesheet = lastFootImage;
    }

    /**
     * Add case to the grid highlight the player selected
     *
     * @param {number} position
     * @param {number} positionGrid
     * @param {boolean} vertical
     **/
    addCaseToGrid(position, positionGrid, vertical) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(vertical ? positionGrid : position.x, !vertical ? positionGrid : position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.ctx.strokeRect(vertical ? positionGrid : position.x, !vertical ? positionGrid : position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.ctx.fill();
    }

    /**
     * Add Grid highlight to the player
     *
     * @return void
     **/
    addGridToPlayer(mapModel, position) {
        // Add grid to the right player
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x + Config.TILE_SIZE * (i + 1);

            if(mapModel.collideIsEdgeMap(position.x + Config.TILE_SIZE, position.y)) {
                if (!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(position, positionGrid, true);
                } else {
                    break;
                }
            }
            else {
                break;
            }
        }

        // Add grid to the left player
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x - Config.TILE_SIZE * (i + 1);

            if(position.x > 0 && position.x / 32 + 1 < Config.MAP_MAX_X && position.y > 0 && (position.y / 32) < Config.MAP_MAX_Y) {
                if (!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(position, positionGrid, true);
                } else {
                    break;
                }
            }
            else {
                break;
            }
        }

        // Add grid to the up player
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y + Config.TILE_SIZE * (i + 1));

            if(position.y > 0 && positionGrid / 32 < Config.MAP_MAX_Y && position.x > 0 && (position.x / 32) < Config.MAP_MAX_X) {
                if (!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(position, positionGrid, false);
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y  - Config.TILE_SIZE * (i + 1));

            if(positionGrid > (0 - 1) && position.y / 32 < Config.MAP_MAX_Y && position.x > 0 && (position.x / 32) < Config.MAP_MAX_X) {
                if (!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(position, positionGrid, false);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

}