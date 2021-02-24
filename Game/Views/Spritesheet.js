/**
 * Classes Spritesheet créer par Joudrier Kevin
 * 
 * @property {HTMLImageElement} image : Image représentant la sprite
 **/
export class Spritesheet {

    constructor(src) {
        this.image = new Image();
        this.image.src = src;
    }

}