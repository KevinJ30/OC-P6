import {GameStore} from './stores/GameStore.js';
import {MenuView} from './Views/MenuView.js';
import {MenuController} from './Controllers/MenuController.js';
import {GameController} from "./Controllers/GameController.js";

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let gameStore = GameStore.getInstance();

let menuView = new MenuView();
let menuController = new MenuController('', menuView);

gameStore.update({
    playerNumber: 50
})

let gameController = new GameController(ScreenRenderer)
gameController.start();

const render = (timestamp) => {
    gameController.update()
    window.requestAnimationFrame(render);
}

window.onload = () => {
    render();
}