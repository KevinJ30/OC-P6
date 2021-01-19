export class GameView {

    constructor() {
        this.ctx = $('#screen')[0].getContext('2d');
    }

    draw(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH){
        this.ctx.drawImage(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH);
    }

}