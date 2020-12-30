import { Player } from './character/Player.js';
import { Input } from './Input.js';

export class Game {

    /**
     * @param {Object} map
     * @param {Object} context
     **/
    constructor(map, context) {
        let playerTile = new Image();
        playerTile.src = "./ressources/skeleton.png";
        this.map = map;
        this.ctx = context;
        this.map.build();0
        this.player = new Player(this.ctx, 64, 64, playerTile, this.map);
        this.input = new Input(this.player, document.getElementById('screen'));
    }

    /**
     * Cette méthode est utilisé dans la boucle du jeu
     **/
    update() {
        this.map.drawMap(this.ctx);
        this.player.animate();
    }
}