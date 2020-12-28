// (function() {
//     const TILE_SIZE = 32;
//     const TILE_MAP_COLS = 16;


//     let ScreenRenderer = document.getElementById('screen');
//     let img_tile_map = new Image({});

//     img_tile_map.src = "./ressources/tile_map.png";
//     context = ScreenRenderer.getContext('2d');
    
//     // Render method
//     const render = (timestamp) => {
//         /**
//          * # Limit FPS
//          **/
//         a = 33;

//         sourceX = Math.floor((a - 1) % TILE_MAP_COLS) * TILE_SIZE;
//         sourceY = Math.floor(a / TILE_MAP_COLS) * TILE_SIZE;

//         //console.log(sourceY)
//         console.log(Math.trunc((a - 1) % TILE_MAP_COLS) * 32)

//         context.drawImage(img_tile_map, sourceX, sourceY, 32, 32, 0, 0, 32, 32);
//         window.requestAnimationFrame(render);
//     }

//     // Wait loaded tile_map
//     img_tile_map.onload = () => {
//         // Get context 2d
        
//         render();
//     }
// })()

import { Map } from './Map.js';
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



