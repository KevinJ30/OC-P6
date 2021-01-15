import { Utils } from '../Utils.js';
import { Config } from "../config/Config.js";
import {GameStore} from "../stores/GameStore.js";
import {MapModel} from "../Models/MapModel.js";
import {PlayerModel, PlayerSprite} from "../Models/PlayerModel.js";
import {InputController} from "./InputController.js";
import {Player} from "../Views/Player.js";
import {Observer} from "../Observer/Observer.js";
import { Generator } from '../Map/Generator.js';
import {WeaponView} from "../Views/Weapon/WeaponView.js";
import {WeaponModel} from "../Models/WeaponModel.js";
import {MapView} from "../Views/MapView.js";

/**
 * @property {Map} map
 * @property {CanvasRenderingContext2D} ctx
 * @property {Array} player
 * @property {Input} input
 **/
export class GameController {

    /**
     * @param {Map} map
     * @param {CanvasRenderingContext2D} context
     **/
    constructor(context) {
        const generator = new Generator();
        this.initObservers();

        this.ctx = context;
        this.mapModel = new MapModel(context, './ressources/tile_map.png',32, 20, 15, this.dropItemObserver);
        this.mapModel.addGenerator(new Generator(Config.MAP_MAX_X, Config.MAP_MAX_Y, Config.BLANK_TILE, Config.WALL_TILE));
        this.mapModel.build();

        this.mapView = new MapView(this.ctx, './ressources/tile_map.png');
        this.players = [];

        this.loadPlayer(2)

        /**
         * Observers
         **/

        /**
         * Bind method
         **/
        this.changeRound = this.changeRound.bind(this);

        /**
         * Update state GameStore
         **/
        this.store = new GameStore();
        this.store.update({
            playerNumber: 50
        })

        this.input = new InputController(this.store, document.getElementById('screen'));
    }

    /**
     * Init observers
     *
     * @return {void}
     **/
    initObservers (){
        this.roundObsever = new Observer();
        this.dropItemObserver = new Observer();
        this.receiveDamageObserver = new Observer();
        this.dropItemEvent = this.dropItemEvent.bind(this);
        this.dropItemObserver.subscribe(this.dropItemEvent);
    }

    dropItemEvent() {
        this.players[this.store.getState().playerSelected].view.setWeapon(new WeaponView('./ressources/dragonspear.png'));
        this.players[this.store.getState().playerSelected].model.setWeapon(new WeaponModel(10));
    }

    /**
     * start the game playing
     **/
    start() {
        this.store.update({
            playerIndex: 0,
            playerSelected: this.players[0],
            map: this.mapModel,
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

            this.players.push({
                model : new PlayerModel(this.receiveDamageObserver, this.dropItemObserver, this.roundObsever, this.ctx, 64, 64, PlayerSprite, this.mapModel, positionPlayer),
                view : new Player(this.receiveDamageObserver, this.ctx, "./ressources/player.png")
            });
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
                x : Math.abs(player.model.position.x - randomX),
                y : Math.abs(player.model.position.y - randomY)
            }

            while(randomX === player.model.position.x && diffPlayerPosition.x < (32 * 3) &&  randomY === player.model.position.y && diffPlayerPosition.y < (32 * 3)) {
                randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
                randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);
            }
        })

        while(this.mapModel.collide(randomX, randomY)) {
            randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
            randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);
        }

        return {x: randomX * 32, y:randomY * 32, numberTile: PlayerSprite.RIGHT};
    }


    /**
     * Configure the change of a round game
     **/
    changeRound() {
        const player1 = this.players[this.store.getState().playerSelected];
        const player2 = this.players[this.store.getState().playerSelected === 1 ? 0: 1];
        
        /**
         * Detect player conflict
         **/
        if(this.detectPlayerConflict(player1, player2)) {
            // le second personnage recoit les degât 
            this.players[this.store.getState().playerSelected === 1 ? 0: 1].model.receiveDamage(player1.model.getDamage());
            
            /**
             * Draw information all player in the console navagator
             **/
            console.log('Name of player : ' + this.players[0].model.username + ' health : ' + this.players[0].model.health);
            console.log('Name of player : ' + this.players[1].model.username + ' health : ' + this.players[1].model.health);
        }

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

        this.mapView.draw(this.mapModel.map, this.mapModel.maxTileX, this.mapModel.maxTileY);
        this.mapView.drawEvents(this.mapModel.mapEvents, this.mapModel.maxTileX, this.mapModel.maxTileY);

        for(let i =0; i < this.players.length; i++) {
            this.players[i].view.update(this.map, this.players[i].model.position, this.players[i].model.playerDirection);
        }

        // Affiche la grille pour le joueur selectionné
        players[playerSelected].view.addGridToPlayer(this.mapModel, players[playerSelected].model.position);

        this.gameOver();
    }

    /**
     * Detect player conflict on the map
     **/
    detectPlayerConflict(player1, player2) {
        const xAbs = Math.abs(player1.model.position.x - player2.model.position.x);
        const yAbs = Math.abs(player1.model.position.y - player2.model.position.y);

        let distance = (xAbs * 2 + yAbs * 2) / 2;

        return distance <= 32;
    }

    gameOver() {
        this.players.forEach((player) => {
            if(player.model.isDead()) {
                console.log('end game....');
                return true;
            }
        })
    }
}