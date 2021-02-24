import {CanvasView} from "../Views/CanvasView.js";
 
/**
 * Classes GameView créer par Joudrier Kevin
 * 
 * @property {HTMLImageElement} background : Image d'arrière du plateau de jeu
 **/
export class GameView extends CanvasView {

    constructor() {
        super();

        this.background = new Image();
        this.background.src = './ressources/background_fight.png';
    }
}