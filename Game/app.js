import {GameStore} from './stores/GameStore.js';
import {MenuView} from './Views/MenuView.js';
import {MenuController} from './Controllers/MenuController.js';
import {GameController} from "./Controllers/GameController.js";
import {HUDController} from "./Controllers/HUDController.js";
import {Observer} from "./Observer/Observer.js";
import {EventManager} from "./EventManager.js";
import {GameOverModel} from "./Models/GameOverModel.js";
import {GameOverView} from "./Views/GameOverView.js";
import {GameOverController} from "./Controllers/GameOverController.js";

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let eventManager = new EventManager();

let attackEvent = new Observer();
let defendEvent = new Observer();
let enterFightObserver = new Observer();
let gameOverObserver = new Observer();

let gameController = new GameController(ScreenRenderer, eventManager);

let menuView = new MenuView();
let menuController = new MenuController(eventManager, gameController.gameModel, '', menuView);

let gameOverModel = new GameOverModel();
let gameOverView = new GameOverView();
let gameOverController = new GameOverController(eventManager, gameOverModel, gameOverView);

gameController.start();

let HUDCtrl = new HUDController(eventManager, gameController.gameModel, defendEvent, gameController.gameOverObserver);

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

