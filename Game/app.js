import { Map } from './Map/Map.js';
import { Game } from './Game.js';
import {GameStore} from "./stores/GameStore.js";

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let runApp = true;

let gameStore = GameStore.getInstance();
gameStore.update({
    playerNumber: 50
})

let game = new Game(new Map(ScreenRenderer, './ressources/tile_map.png', 32, 20, 15), ScreenRenderer);

let i = 0;

const render = (timestamp) => {
    game.update()
    window.requestAnimationFrame(render);
}

window.onload = () => {
    render();
}