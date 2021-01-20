import {GameStore} from './stores/GameStore.js';
import {MenuView} from './Views/MenuView.js';
import {MenuController} from './Controllers/MenuController.js';
import {GameController} from "./Controllers/GameController.js";
import {HUDController} from "./Controllers/HUDController.js";

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let gameController = new GameController(ScreenRenderer)

let menuView = new MenuView();
let menuController = new MenuController(gameController.gameModel, '', menuView);

gameController.start();

let HUDCtrl = new HUDController(gameController.gameModel);

document.getElementById('screen').addEventListener('click', (event) => {
    if(!gameController.gameModel.isFight) {
        let player = gameController.gameModel.players[gameController.gameModel.playerSelected];
        player.model.moveTarget(event.offsetX, event.offsetY);
    }
});

const render = (timestamp) => {
    if(!gameController.gameModel.isFight) {
        if(!gameController.update()) {
            return cancelAnimationFrame(this);
        }
    }
    else {
        gameController.updateFight();
    }

    window.requestAnimationFrame(render);
}

window.onload = () => {
    render();
}

