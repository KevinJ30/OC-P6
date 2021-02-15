export class CanvasView {

    constructor(canvasHtml) {
        this.ctx = $('#screen')[0].getContext('2d');
    }

    draw(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH){
        this.ctx.drawImage(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH);
    }

    resetCanvas(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }
}