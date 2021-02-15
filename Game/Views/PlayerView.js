import {Config} from "../config/Config.js";
import {WeaponView} from "./Weapon/WeaponView.js";
import {Spritesheet} from "./Spritesheet.js";

/**
 * Class Player view
 *
 * @property {HTMLImageElement} spriteSheet
 **/
export class PlayerView extends Spritesheet {

    /**
     * Constructor.
     **/
    constructor(src) {
        super(src);

        this.weaponView = null;
        this.animateDamage = this.animateDamage.bind(this);
        this.chest = null;
        this.legs = null;
        this.foot = null;
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
     * @param {{x: number, y: number}} position
     * @param {number} playerDirection
     * @param {number} [scale]
     * @param weaponSpriteSelect
     **/
    update(gameView, playerModel, position, playerDirection, scale, weaponSpriteSelect) {
        const numberTile = playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        if(this.spritesheet) {
            gameView.draw(this.spritesheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }

        if(this.chest && this.legs && this.foot) {
            gameView.draw(this.chest.spritesheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            gameView.draw(this.legs.spritesheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            gameView.draw(this.foot.spritesheet, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }

        // Affichage de l'arme
        if(this.weaponView) {
            const sourceXWeapon = Math.floor(weaponSpriteSelect % 9) * 64;
            const sourceYWeapon = Math.floor((weaponSpriteSelect / 9)) *  64;
            gameView.draw(this.weaponView.spritesheet, sourceXWeapon, sourceYWeapon, 64, 64, position.x, position.y, scale * 32, scale * 32);
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
        const playerSpriteBuffer = this.spritesheet;
        const chestSpriteBuffer = this.chest;
        const legsSpriteBuffer = this.legs;
        const footSpriteBuffer = this.foot;
        const weaponSpriteBuffer = this.weaponView !== null ? this.weaponView : null;


        this.spritesheet = null;
        this.chest = null;
        this.legs = null;
        this.foot = null;

        if(this.weaponView) {
            this.weaponView = null;
        }

        setTimeout(() => {
            this.spritesheet = playerSpriteBuffer;
            this.chest = chestSpriteBuffer;
            this.legs = legsSpriteBuffer;
            this.foot = footSpriteBuffer;
            this.weaponView = weaponSpriteBuffer;
        }, 250)
    }

    /**
     * Add case to the grid highlight the player selected
     *
     * @param {number} position
     * @param {number} positionGrid
     * @param {boolean} vertical
     **/
    addCaseToGrid(gameView, position, positionGrid, vertical) {
        gameView.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        gameView.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        gameView.ctx.fillRect(vertical ? positionGrid : position.x, !vertical ? positionGrid : position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        gameView.ctx.strokeRect(vertical ? positionGrid : position.x, !vertical ? positionGrid : position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        gameView.ctx.fill();
    }

    addGridLeftToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x - Config.TILE_SIZE * (i + 1);

            if(positionGrid >= 0) {
                if(!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, true);
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

    addGridRigthToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x + Config.TILE_SIZE * (i + 1);

            if(positionGrid < Config.MAP_MAX_X * 32) {
                if(!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, true);
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

    addGridUpToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y - Config.TILE_SIZE * (i + 1));

            if(positionGrid >= 0) {
                if(!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, false);
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

    addGridDownToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y + Config.TILE_SIZE * (i + 1));

            if(positionGrid < Config.MAP_MAX_Y * 32) {
                if(!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, false);
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
    addGridToPlayer(context, mapModel, position) {
        // Add grid to the right player
        this.addGridLeftToPlayer(context, mapModel, position);
        this.addGridRigthToPlayer(context, mapModel, position);
        this.addGridUpToPlayer(context, mapModel, position);
        this.addGridDownToPlayer(context, mapModel, position)
    }

}