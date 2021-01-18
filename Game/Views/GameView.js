export class GameView {

    /**
     * @param {CanvasRenderingContext2D} context
     **/
    constructor(context) {
        this.ctx = context
    }

    draw(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH){
        this.ctx.drawImage(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH);
    }

}