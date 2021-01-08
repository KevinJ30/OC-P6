import { Utils } from './Utils.js';
import {Player, PlayerSprite} from './character/Player.js';
import { Input } from './Input.js';
import { Config } from "./config/Config.js";
import {GameStore} from "./stores/GameStore.js";
import {RoundObserver} from "./Observer/RoundObserver.js";
import {DropItemObserver} from "./Observer/DropItemObserver.js";
import {Map} from "./Map/Map.js";
import {Container} from "./Container.js";

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
    constructor(context) {
        this.dropItemObserver = new DropItemObserver();
        this.ctx = context;
        this.map = new Map(context, './ressources/tile_map.png',32, 20, 15, this.dropItemObserver);
        this.map.build();
        this.players = [];
        this.roundObsever = new RoundObserver();
        this.loadPlayer(2)

        /**
         * Bind method
         **/
        this.changeRound = this.changeRound.bind(this);

        /**
         * Update state GameStore
         **/
        this.store = GameStore.getInstance();
        this.input = new Input(this.store, document.getElementById('screen'));
    }

    /**
     * start the game playing
     **/
    start() {
        this.store.update({
            playerIndex: 0,
            playerSelected: this.players[0],
            map: this.map,
            players: this.players
        })

        // subscribe observer player
        this.roundObsever.subscribe(this.changeRound)
        this.store.getState().playerSelected = 0;
        this.input.init();
    }

    /**
     * Initialize player on the game
     *
     * @param {number} numberPlayer
     * @return void
     **/
    loadPlayer(numberPlayer) {
        let PlayerSprite = new Image();
        PlayerSprite.src = "./ressources/player.png";

        for(let i = 0; i < numberPlayer; i++) {
            // Generate position
            let positionPlayer = this.generatePositionPlayer();
            this.players.push(new Player(this.dropItemObserver, this.roundObsever, this.ctx, 64, 64, PlayerSprite, this.map, positionPlayer))
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

        return {x: randomX * 32, y:randomY * 32, numberTile: PlayerSprite.RIGHT};
    }


    /**
     * Configure the change of a round game
     **/
    changeRound() {
        if(this.store.getState().playerSelected === 0) {
            this.store.getState().playerSelected = 1
        }
        else {
            this.store.getState().playerSelected = 0
        }
    }

    /**
     * Game loop
     * @return void
     **/
    update() {
        let players = this.store.getState().players;
        let playerSelected = this.store.getState().playerSelected;

        this.map.drawMap();
        this.map.drawEvents();

        this.players.forEach((player) => {
            player.update(player.position);
        })

        // Affiche la grille pour le joueur selectionné
        players[playerSelected].addGridToPlayer();

        this.gameOver();
    }

    gameOver() {
        this.players.forEach((player) => {
            if(player.isDead()) {
                console.log('end game....');
                return true;
            }
        })
    }
}