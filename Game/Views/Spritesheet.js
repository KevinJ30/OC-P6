/**
 * Classes Spritesheet créer par Joudrier Kevin
 * 
 * @property {HTMLImageElement} image : Image représentant la sprite
 **/
export class Spritesheet {

    /**
     * @param {string} src : Chemin de l'image de la spritesheet
     **/
    constructor(src) {
        this.image = new Image();
        this.image.src = src;
    }

}