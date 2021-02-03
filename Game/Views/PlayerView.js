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
     * @param {CanvasRenderingContext2D} context
     * @param {string} spriteSheetSrc
     */
    constructor(context, spriteSheetSrc) {
        this.weaponView = null;
        this.ctx = context;

        this.animateDamage = this.animateDamage.bind(this);
    }

    /**
     * Add weapon to the player
     * @param {WeaponView} weapon
     **/
    setWeapon(weapon) {
        this.weaponView = weapon;
    }

    /**
     *
     * @param {PlayerModel} playerModel
     * @param {MapModel} mapModel
     * @param {{x: number, y: number}} position
     * @param {number} playerDirection
     * @param {number} [scale]
     * @param weaponSpriteSelect
     **/
    update(playerModel, mapModel, position, playerDirection, scale, weaponSpriteSelect) {
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

        // Affichage de l'arme
        if(this.weaponView) {
            const sourceXWeapon = Math.floor(weaponSpriteSelect % 9) * 64;
            const sourceYWeapon = Math.floor((weaponSpriteSelect / 9)) *  64;
            this.weaponView.draw(this.ctx, sourceXWeapon, sourceYWeapon, position.x, position.y, scale);
        }
    }

    animateAttack(playerModel, position, scale) {
        if(this.weaponView){
            const spriteSelectedBuffer = playerModel.weaponSpriteSelect;
            let i = 0;
            let animation = setInterval(() => {
                playerModel.weaponSpriteSelect  += 1;
                i++;
                if(i >= 8) {
                    playerModel.weaponSpriteSelect = spriteSelectedBuffer;
                    clearInterval(animation);
                }
            }, 50)
        }
    }

    /**
     * Animate player when receive damage
     * @param {PlayerModel} playerModel
     **/
    animateDamage(playerModel) {
        // let i = 0;
        // let playerSpriteBuffer = playerModel.spriteSheet;
        //
        // let chestSpriteBuffer = playerModel.chest.spriteSheet;
        // let legsSpriteBuffer = playerModel.legs.spriteSheet;
        // let footSpriteBuffer = playerModel.foot.spriteSheet;
        // let weaponSpriteBuffer = this.weaponView !== null ? this.weaponView.spriteSheet : null;
        //
        // let animation = setInterval(() => {
        //     playerModel.spriteSheet = null;
        //     playerModel.chest.spriteSheet = null;
        //     playerModel.legs.spriteSheet = null;
        //     playerModel.foot.spriteSheet = null;
        //
        //     if(this.weaponView) {
        //         this.weaponView.spriteSheet = null;
        //     }
        //
        //     i++;
        //     if(i > 1) {
        //         playerModel.spriteSheet = playerSpriteBuffer;
        //         playerModel.chest.spriteSheet = chestSpriteBuffer;
        //         playerModel.legs.spriteSheet = legsSpriteBuffer;
        //         playerModel.foot.spriteSheet = footSpriteBuffer;
        //
        //         if(this.weaponView) {
        //             this.weaponView.spriteSheet = weaponSpriteBuffer;
        //         }
        //         clearInterval(animation);
        //     }
        // }, 250)

        const playerSpriteBuffer = playerModel.spriteSheet;
        const chestSpriteBuffer = playerModel.chest.spriteSheet;
        const legsSpriteBuffer = playerModel.legs.spriteSheet;
        const footSpriteBuffer = playerModel.foot.spriteSheet;
        const weaponSpriteBuffer = this.weaponView !== null ? this.weaponView.spriteSheet : null;


        playerModel.spriteSheet = null;
        playerModel.chest.spriteSheet = null;
        playerModel.legs.spriteSheet = null;
        playerModel.foot.spriteSheet = null;

        if(this.weaponView) {
            this.weaponView.spriteSheet = null;
        }

        setTimeout(() => {
            playerModel.spriteSheet = playerSpriteBuffer;
            playerModel.chest.spriteSheet = chestSpriteBuffer;
            playerModel.legs.spriteSheet = legsSpriteBuffer;
            playerModel.foot.spriteSheet = footSpriteBuffer;

            if(this.weaponView) {
                this.weaponView.spriteSheet = weaponSpriteBuffer;
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