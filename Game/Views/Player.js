import {Config} from "../config/Config.js";

/**
 * Class Player view
 *
 * @property {HTMLImageElement} spriteSheet
 **/
export class Player {

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {string} spriteSheetSrc
     */
    constructor(context, spriteSheetSrc) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
        this.ctx = context;
    }

    /**
     *
     * @param {{x: number, y: number}} position
     * @param {number} playerDirection
     **/
    update(position, playerDirection, ) {
        const numberTile = playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        if(this.spriteSheet) {
            this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        }



        /**if(this.chest && this.legs && this.foot) {
            this.chest.draw(this.ctx, sourceX, sourceY, position.x, position.y);
            this.legs.draw(this.ctx, sourceX, sourceY, position.x, position.y);
            this.foot.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        }

        if(this.weapon) {
            this.weapon.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        }

        this.isDead();**/
    }

}