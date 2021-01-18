import { Utils } from '../Utils.js';
import { Config } from "../config/Config.js";
import {GameStore} from "../stores/GameStore.js";
import {MapModel} from "../Models/MapModel.js";
import {PlayerModel, PlayerSprite} from "../Models/PlayerModel.js";
import {InputController} from "./InputController.js";
import {PlayerView} from "../Views/PlayerView.js";
import {Observer} from "../Observer/Observer.js";
import { Generator } from '../Map/Generator.js';
import {MapView} from "../Views/MapView.js";
import {WeaponView} from "../Views/Weapon/WeaponView.js";
import {WeaponModel} from "../Models/WeaponModel.js";

/**
 * @property {Map} map
 * @property {CanvasRenderingContext2D} ctx
 * @property {Array} player
 * @property {InputController} input
 **/
export class GameController {

    /**
     * @param {CanvasRenderingContext2D} context
     **/
    constructor(context) {
        const generator = new Generator();
        this.initObservers();

        this.ctx = context;
        this.mapModel = new MapModel(32, 20, 15, this.dropItemObserver);
        this.mapModel.addGenerator(new Generator(Config.MAP_MAX_X, Config.MAP_MAX_Y, Config.BLANK_TILE, Config.WALL_TILE));
        this.mapModel.build();

        this.mapView = new MapView(this.ctx);

        /**
         * Bind method
         **/
        this.changeRound = this.changeRound.bind(this);

        /**
         * Update state GameStore
         **/
        this.store = new GameStore();
        this.loadPlayer(2)
        this.store.notify('111');
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
        this.store.getPlayerSelected().view.setWeapon(new WeaponView('./ressources/dragonspear.png'));
        this.store.getPlayerSelected().model.setWeapon(new WeaponModel(10));
    }

    /**
     * start the game playing
     **/
    start() {
        // subscribe observer player
        this.store.getState().playerSelected = 0;
        this.roundObsever.subscribe(this.changeRound)
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

            this.store.addPlayer({
                model : new PlayerModel(this.receiveDamageObserver, this.dropItemObserver, this.roundObsever, this.ctx, 64, 64, PlayerSprite, this.mapModel, positionPlayer),
                view : new PlayerView(this.receiveDamageObserver, this.ctx, "./ressources/player.png")
            });

            // Intialisation des noms
            this.store.getState().players[i].model.setName('Player ' + i);
        }
    }

    /**
     * Generate random position for the player
     * 
     * @param {Array<PlayerView>} players
     * @returns {{x: number, y: number}}
     **/
    generatePositionPlayer() {
        let randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
        let randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);

        this.store.getPlayers().forEach((player) => {
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
        const player1 = this.store.getPlayerSelected();
        const player2 = this.store.getNotSelectedPlayer();

        /**
         * Detect player conflict
         **/
        if(this.detectPlayerConflict(player1, player2)) {
            // le second personnage recoit les degât
            this.store.getNotSelectedPlayer().model.receiveDamage(player1.model.getDamage())
            this.store.notify();

            /**
             * Draw information all player in the console navagator
             **/
            console.log('Name of player : ' + this.store.getPlayerIndex(0).model.username + ' health : ' + this.store.getPlayerIndex(0).model.health);
            console.log('Name of player : ' + this.store.getPlayerIndex(1).model.username + ' health : ' + this.store.getPlayerIndex(1).model.health);
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
     * @return {boolean} endGame
     **/
    update() {
        let players = this.store.getPlayers();
        let playerSelected = this.store.getState().playerSelected;

        this.mapView.draw(this.mapModel.spriteSheet, this.mapModel.map, this.mapModel.maxTileX, this.mapModel.maxTileY);
        this.mapView.drawEvents(this.mapModel.spriteSheet, this.mapModel.mapEvents, this.mapModel.maxTileX, this.mapModel.maxTileY);

        for(let i =0; i < this.store.countPlayer(); i++) {
            this.store.getPlayerIndex(i).view.update(this.store.getPlayerModelWithIndex(i), this.map, this.store.getPlayerIndex(i).model.position, this.store.getPlayerIndex(i).model.playerDirection);
        }

        // Affiche la grille pour le joueur selectionné
        this.store.getPlayerSelected().view.addGridToPlayer(this.mapModel, this.store.getPlayerSelected().model.position);

        // Si le player est mort on ecrit dans la console
        if(this.gameOver())
        {
            console.log('end game....');
            return false;
        }

        return true;
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
        let isDeadPlayer = 0;
        this.store.getPlayers().forEach((player) => {
            if(player.model.isDead()) {
                isDeadPlayer++;
            }
        })

        return isDeadPlayer > 0;
    }
}