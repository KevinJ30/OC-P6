import {Config} from "../config/Config.js";
import {WeaponView} from "./Weapon/WeaponView.js";
import {GameView} from "./GameView.js";

/**
 * Class Player view
 *
 * @property {HTMLImageElement} spriteSheet
 **/
export class PlayerView {

    /**
     *
     * @param {Observer} receiveDamageObserver
     * @param {CanvasRenderingContext2D} context
     * @param {string} spriteSheetSrc
     */
    constructor(receiveDamageObserver, context, spriteSheetSrc) {
        this.receiveDamageObserver = receiveDamageObserver;

        this.weaponView = new WeaponView('./ressources/dragonspear.png');
        this.ctx = context;

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
            this.ctx.drawImage(playerModel.spriteSheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }

        if(playerModel.chest.spriteSheet && playerModel.legs.spriteSheet && playerModel.foot.spriteSheet) {
            this.ctx.drawImage(playerModel.chest.spriteSheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            this.ctx.drawImage(playerModel.legs.spriteSheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            this.ctx.drawImage(playerModel.foot.spriteSheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }
        else {
            console.log(1111);
        }

        // Affichage de l'arme

        const sourceXWeapon = Math.floor(this.weaponView.spriteSelected % 9) * 64;
        const sourceYWeapon = Math.floor((this.weaponView.spriteSelected / 9)) *  64;

        if(this.weaponView.spriteSheet) {
            this.weaponView.draw(this.ctx, sourceXWeapon, sourceYWeapon, position.x, position.y, scale);
        }
    }

    animateAttack(weaponSprite, position, scale) {
        const spriteSelectedBuffer = this.weaponView.spriteSelected;
        let i = 0;

        console.log(this.weaponView.spriteSelected);

        let animation = setInterval(() => {
            this.weaponView.spriteSelected  += 1;
            i++;
            if(i >= 8) {
                this.weaponView.spriteSelected = spriteSelectedBuffer;
                clearInterval(animation);
            }
        }, 50)
    }

    /**
     * Animate player when receive damage
     * @param {PlayerModel} playerModel
     **/
    animateDamage(playerModel) {
        let i = 0;
        let playerSpriteBuffer = playerModel.spriteSheet;

        let chestSpriteBuffer = playerModel.chest.spriteSheet;
        let legsSpriteBuffer = playerModel.legs.spriteSheet;
        let footSpriteBuffer = playerModel.foot.spriteSheet;
        let weaponSpriteBuffer = this.weaponView.spriteSheet;

        let animation = setInterval(() => {
            playerModel.spriteSheet = null;
            playerModel.chest.spriteSheet = null;
            playerModel.legs.spriteSheet = null;
            playerModel.foot.spriteSheet = null;
            this.weaponView.spriteSheet = null;
            i++;
            if(i > 1) {
                playerModel.spriteSheet = playerSpriteBuffer;
                playerModel.chest.spriteSheet = chestSpriteBuffer;
                playerModel.legs.spriteSheet = legsSpriteBuffer;
                playerModel.foot.spriteSheet = footSpriteBuffer;
                this.weaponView.spriteSheet = weaponSpriteBuffer;
                clearInterval(animation);
            }
        }, 250)
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