import { Map } from './Map/Map.js';
import { Game } from './Game.js';

let ScreenRenderer = document.getElementById('screen').getContext('2d');

/**
 * Boucle de jeu
 **/
let runApp = true;
let game = new Game(new Map('./ressources/tile_map.png', 32, 20, 15), ScreenRenderer);
let timeStart, timeEnd;

let i = 0;

const render = (timestamp) => {
    game.update()
    window.requestAnimationFrame(render);
}

window.onload = () => {
    render();
}



