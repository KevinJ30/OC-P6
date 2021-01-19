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
import {GameView} from "../Views/GameView.js";
import {GameModel} from "../Models/GameModel.js";

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
        this.dropItemObserver = new Observer();
        this.roundObserver = new Observer();
        this.receiveDamageObserver = new Observer();

        this.gameView = new GameView();
        this.gameModel = new GameModel();
        this.mapModel = new MapModel(32, 20, 15, this.dropItemObserver);
        this.mapView = new MapView(this.gameView.ctx);

        this.bindingMethodOfClass();
        this.allSubscribeToObserver();
    }

    bindingMethodOfClass() {
        this.changeRoundEvent = this.changeRoundEvent.bind(this);
        this.dropItemEvent = this.dropItemEvent.bind(this);
    }

    allSubscribeToObserver() {
        this.roundObserver.subscribe(this.changeRoundEvent);
        this.dropItemObserver.subscribe(this.dropItemEvent);
    }

    dropItemEvent() {
        this.gameModel.getPlayerSelected().view.setWeapon(new WeaponView('./ressources/dragonspear.png'));
        this.gameModel.getPlayerSelected().model.setWeapon(new WeaponModel(10));
    }

    /**
     * start the game playing
     **/
    start() {
        // Init your map
        this.mapModel.addGenerator(new Generator(Config.MAP_MAX_X, Config.MAP_MAX_Y, Config.BLANK_TILE, Config.WALL_TILE));
        this.mapModel.build();

        // initialise value of the model
        this.gameModel.isStarted = true;
        this.gameModel.isFight = false;
        this.gameModel.playerSelected = 0;
        this.gameModel.players = this.createPlayers(2);
        this.gameModel.notify();
    }

    /**
     * Create list of the new player
     *
     * @param {number} numberPlayer
     * @return {Array} : list of the players
     **/
    createPlayers(numberPlayer) {
        let players = [];
        let PlayerSprite = new Image();
        PlayerSprite.src = "./ressources/player.png";

        for(let i = 0; i < numberPlayer; i++) {
            // Generate position
            let positionPlayer = this.generatePositionPlayer();

            players.push({
                model : new PlayerModel(this.receiveDamageObserver, this.dropItemObserver, this.roundObserver, this.ctx, 64, 64, PlayerSprite, this.mapModel, positionPlayer),
                view : new PlayerView(this.receiveDamageObserver, this.ctx, "./ressources/player.png")
            });

            // Init default name players
            players[i].model.setName('Player ' + i);
        }

        return players;
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

        this.gameModel.getPlayers().forEach((player) => {
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
    changeRoundEvent() {
        const player1 = this.store.getPlayerSelected();
        const player2 = this.store.getNotSelectedPlayer();

        /**
         * Detect player conflict
         **/
        if(this.detectPlayerConflict(player1, player2)) {
            // le second personnage recoit les degât
            this.gameModel.getNotSelectedPlayer().model.receiveDamage(player1.model.getDamage())
            this.gameModel.notify();

            /**
             * Draw information all player in the console navagator
             **/
            console.log('Name of player : ' + this.gameModel.getPlayerIndex(0).model.username + ' health : ' + this.gameModel.getPlayerIndex(0).model.health);
            console.log('Name of player : ' + this.gameModel.getPlayerIndex(1).model.username + ' health : ' + this.gameModel.getPlayerIndex(1).model.health);
        }

        if(this.gameModel.getState().playerSelected === 0) {
            this.gameModel.getState().playerSelected = 1
        }
        else {
            this.gameModel.getState().playerSelected = 0
        }
    }

    /**
     * Game loop
     * @return {boolean} endGame
     **/
    update() {
        let players = this.gameModel.getPlayers();
        let playerSelected = this.gameModel.getState().playerSelected;

        this.mapView.draw(this.mapModel.spriteSheet, this.mapModel.map, this.mapModel.maxTileX, this.mapModel.maxTileY);
        this.mapView.drawEvents(this.mapModel.spriteSheet, this.mapModel.mapEvents, this.mapModel.maxTileX, this.mapModel.maxTileY);

        for(let i =0; i < this.gameModel.countPlayer(); i++) {
            this.gameModel.getPlayerIndex(i).view.update(this.gameModel.getPlayerModelWithIndex(i), this.map, this.gameModel.getPlayerIndex(i).model.position, this.gameModel.getPlayerIndex(i).model.playerDirection);
        }

        // Affiche la grille pour le joueur selectionné
        this.gameModel.getPlayerSelected().view.addGridToPlayer(this.mapModel, this.gameModel.getPlayerSelected().model.position);

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
        this.gameModel.getPlayers().forEach((player) => {
            if(player.model.isDead()) {
                isDeadPlayer++;
            }
        })

        return isDeadPlayer > 0;
    }
}