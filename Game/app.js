import { Game } from './Game.js';
import {GameStore} from './stores/GameStore.js';
import {MenuView} from './Views/MenuView.js';

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let gameStore = GameStore.getInstance();

let menuView = new MenuView();

gameStore.update({
    playerNumber: 50
})

let game = new Game(ScreenRenderer)
game.start();

const render = (timestamp) => {
    game.update()
    window.requestAnimationFrame(render);
}

window.onload = () => {
    render();
}