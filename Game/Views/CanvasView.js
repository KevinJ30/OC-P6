/**
 * Classe CanvasView créer par Joudrier Kevin
 * 
 * @property {CanvasRenderingContext2D} ctx : Canvas HTML
 **/
export class CanvasView {

    /**
     * @param {CanvasRenderingContext2D} canvasHtml 
     **/
    constructor(canvasHtml) {
        this.ctx = $('#screen')[0].getContext('2d');
    }

    /**
     * Dessine sur le canvas HTML
     * 
     * @param {HTMLImageElement} spriteSheet
     * @param {number} sourceX 
     * @param {number} sourceY 
     * @param {number} sourceW 
     * @param {number} sourceH 
     * @param {number} destinationX 
     * @param {number} destinationY 
     * @param {number} destinationW 
     * @param {number} destinationH
     * 
     * @return {void}
     **/
    draw(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH){
        this.ctx.drawImage(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH);
    }

    /**
     * Efface la zone du canvas définit
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * 
     * @return {void}
     **/
    resetCanvas(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }
}