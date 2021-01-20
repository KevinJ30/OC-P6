import {Config} from "../config/Config.js";

export class GameView {

    constructor() {
        this.ctx = $('#screen')[0].getContext('2d');
        this.background = new Image();
        this.background.src = './ressources/background_fight.png';
    }

    draw(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH){
        this.ctx.drawImage(spriteSheet, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH);
    }

    drawFight() {
        this.ctx.drawImage(this.background, 0, 0,  1104, 621, 0, 0, Config.MAP_MAX_X * 32, Config.MAP_MAX_Y * 32);
    }

    resetCanvas(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }
}