import {GameStore} from './stores/GameStore.js';
import {MenuView} from './Views/MenuView.js';
import {MenuController} from './Controllers/MenuController.js';
import {GameController} from "./Controllers/GameController.js";
import {HUDController} from "./Controllers/HUDController.js";

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let menuView = new MenuView();
let menuController = new MenuController('', menuView);

let gameController = new GameController(ScreenRenderer)
console.log(gameController.store);
gameController.start();

let HUDCtrl = new HUDController(gameController.store);

const render = (timestamp) => {
    if(!gameController.update()) {
        return cancelAnimationFrame(this);
    }

    window.requestAnimationFrame(render);
}

window.onload = () => {
    render();
}