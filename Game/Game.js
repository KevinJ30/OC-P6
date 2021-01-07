import { Utils } from './Utils.js';
import {Player, PlayerTile} from './character/Player.js';
import { Input } from './Input.js';
import { Config } from "./config/Config.js";
import {GameStore} from "./stores/GameStore.js";
import {PlayerObserver} from "./Observer/playerObserver.js";

/**
 * @property {Map} map
 * @property {CanvasRenderingContext2D} ctx
 * @property {Array} player
 * @property {Input} input
 **/
export class Game {

    /**
     * @param {Map} map
     * @param {CanvasRenderingContext2D} context
     **/
    constructor(map, context) {
        this.map = map;
        this.ctx = context;
        this.map.build();
        this.players = [];
        this.loadPlayer(2)

        this.playerObserver = new PlayerObserver();

        // subscribe observer player
        this.playerObserver.subscribe((playerSelected) => {
            this.playerSelected = playerSelected;
        })

        this.playerObserver.notify(this.players[1]);

        /**
         * Update state GameStore
         **/
        this.store = GameStore.getInstance();

        this.store.update({
            playerIndex: 0,
            playerSelected: this.playerSelected,
            map: this.map
        })

        this.input = new Input(this.store, this.store.getState().playerSelected, document.getElementById('screen'));
        this.input.init();
    }

    /**
     * Initialize player on the game
     *
     * @param {number} numberPlayer
     * @return void
     **/
    loadPlayer(numberPlayer) {
        let playerTile = new Image();
        playerTile.src = "./ressources/player.png";

        for(let i = 0; i < numberPlayer; i++) {
            // Generate position
            let positionPlayer = this.generatePositionPlayer();
            this.players.push(new Player(this.ctx, 64, 64, playerTile, this.map, positionPlayer))
        }
    }

    /**
     * Generate random position for the player
     * 
     * @param {Array<Player>} players
     * @returns {{x: number, y: number}}
     **/
    generatePositionPlayer() {
        let randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
        let randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);

        this.players.forEach((player) => {
            let diffPlayerPosition = {
                x : Math.abs(player.position.x - randomX),
                y : Math.abs(player.position.y - randomY)
            }

            while(randomX === player.position.x && diffPlayerPosition.x < (32 * 3) &&  randomY === player.position.y && diffPlayerPosition.y < (32 * 3)) {
                randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
                randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);
            }
        })

        while(this.map.collide(randomX, randomY)) {
            randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
            randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);
        }

        return {x: randomX * 32, y:randomY * 32, numberTile: PlayerTile.RIGHT};
    }

    /**
     * Game loop
     * @return void
     **/
    update() {
        this.map.drawMap();
        this.players.forEach((player) => {
            player.update(player.position);
        })
    }
}