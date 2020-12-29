import { Player } from './character/Player.js';

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
        this.player = new Player(64, 64, playerTile);
    }

    /**
     * Cette méthode est utilisé dans la boucle du jeu
     **/
    update() {
        this.map.drawMap(this.ctx);
        this.player.animate(this.ctx);
    }

}