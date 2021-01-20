import {Config} from "../config/Config.js";
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
     * @param {number} [scale]
     **/
    update(playerModel, mapModel, position, playerDirection, scale) {
        const numberTile = playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        if(playerModel.spriteSheet) {
            this.draw(playerModel.spriteSheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }

        if(playerModel.chest && playerModel.legs && playerModel.foot) {
            this.draw(playerModel.chest.spriteSheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            this.draw(playerModel.legs.spriteSheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            this.draw(playerModel.foot.spriteSheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }

        if(playerModel.weapon && this.weaponView) {
            this.weaponView.draw(this.ctx, sourceX, sourceY, position.x, position.y, scale);
        }

        //this.isDead();

    }

    /**
     * Animate player when receive damage
     * @param {PlayerModel} playerModel
     **/
    animateDamage(playerModel) {
        let i = 0;
        let lastImagePlayer = playerModel.spriteSheet;

        let lastChestImage = playerModel.chest.spritesheet;
        let lastLegsImage = playerModel.legs.spritesheet;
        let lastFootImage = playerModel.foot.spritesheet;

        // Animation disparition player
        let animation = setInterval(() => {
            this.spriteSheet = this.spriteSheet === null ? lastImagePlayer : null;
            playerModel.chest.spritesheet = playerModel.chest.spritesheet === null ? lastChestImage : null;
            playerModel.legs.spritesheet = playerModel.legs.spritesheet === null ? lastLegsImage : null;
            playerModel.foot.spritesheet = playerModel.foot.spritesheet === null ? lastFootImage : null;
            if(i > 4) {
                clearInterval(animation);
            }
            i++;
        }, 250)

        playerModel.spriteSheet = lastImagePlayer;
        playerModel.chest.spritesheet = lastChestImage;
        playerModel.legs.spritesheet = lastLegsImage;
        playerModel.foot.spritesheet = lastFootImage;
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

    addGridLeftToPlayer(mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x - Config.TILE_SIZE * (i + 1);

            if(positionGrid >= 0) {
                if(!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(position, positionGrid, true);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    addGridRigthToPlayer(mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x + Config.TILE_SIZE * (i + 1);

            if(positionGrid < Config.MAP_MAX_X * 32) {
                if(!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(position, positionGrid, true);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    addGridUpToPlayer(mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y - Config.TILE_SIZE * (i + 1));

            if(positionGrid >= 0) {
                if(!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(position, positionGrid, false);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    addGridDownToPlayer(mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y + Config.TILE_SIZE * (i + 1));

            if(positionGrid < Config.MAP_MAX_Y * 32) {
                if(!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(position, positionGrid, false);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    /**
     * Add Grid highlight to the player
     *
     * @return void
     **/
    addGridToPlayer(mapModel, position) {
        // Add grid to the right player
        this.addGridLeftToPlayer(mapModel, position);
        this.addGridRigthToPlayer(mapModel, position);
        this.addGridUpToPlayer(mapModel, position);
        this.addGridDownToPlayer(mapModel, position)
    }

}