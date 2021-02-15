import {CanvasView} from "../Views/CanvasView.js";

export class GameView extends CanvasView {

    constructor() {
        super();

        this.background = new Image();
        this.background.src = './ressources/background_fight.png';
    }
}