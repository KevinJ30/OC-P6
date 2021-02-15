import { Utils } from '../Utils.js';
import { Config } from "../config/Config.js";
import {MapModel} from "../Models/MapModel.js";
import {PlayerModel, PlayerSprite} from "../Models/PlayerModel.js";
import {PlayerView} from "../Views/PlayerView.js";
import { Generator } from '../Map/Generator.js';
import {MapView} from "../Views/MapView.js";
import {WeaponView} from "../Views/Weapon/WeaponView.js";
import {WeaponModel} from "../Models/WeaponModel.js";
import {ArmorModel} from "../Models/Armors/ArmorModel.js";

/**
 * @property {Map} map
 * @property {CanvasRenderingContext2D} ctx
 * @property {Array} player
 * @property {InputController} input
 **/
export class GameController {

    /**
     * @param {EventManager} eventManager
     **/
    constructor(eventManager, gameModel, gameView) {
        this.eventManager = eventManager;

        this.gameView = gameView;
        this.gameModel = gameModel;
        this.mapModel = new MapModel(32, 20, 15, this.eventManager);
        this.mapView = new MapView(this.gameView.ctx);

        this.background = new Image();
        this.background.src = './ressources/background_fight.png';


        this.bindingMethodOfClass();
        this.allSubscribeToObserver();

        this.gameModel.players = this.createPlayers(2);
    }

    bindingMethodOfClass() {
        this.changeRoundEvent = this.changeRoundEvent.bind(this);
        this.dropItemEvent = this.dropItemEvent.bind(this);
        this.defendPlayerEvent = this.defendPlayerEvent.bind(this);
        this.enterFightEvent = this.enterFightEvent.bind(this);
        this.restart = this.restart.bind(this);
        this.start = this.start.bind(this);
    }

    allSubscribeToObserver() {
        this.eventManager.attach('game.changeRoundEvent', this.changeRoundEvent, 0);
        this.eventManager.attach('game.dropItemEvent', this.dropItemEvent, 0);
        this.eventManager.attach('game.defendPlayerEvent', this.defendPlayerEvent, 0);
        this.eventManager.attach('game.enterFightEvent', this.enterFightEvent, 0);
        this.eventManager.attach('game.restartGame', this.restart, 0);
        this.eventManager.attach('game.startGameEvent', this.start, 0);
    }

    dropItemEvent() {
        let weapons = [
            new WeaponModel("Epée rouillé", 10),
            new WeaponModel("Sabre du desert", 15),
            new WeaponModel("Lance affûté", 25),
            new WeaponModel("Lance en fer forgé", 35)
        ];

        this.gameModel.getPlayerSelected().view.setWeapon(new WeaponView('./ressources/dragonspear.png'));
        this.gameModel.getPlayerSelected().model.setWeapon(weapons[Utils.randomNumber(0, 3)]);
    }

    /**
     * start the game playing
     **/
    start() {
        // Init your map
        this.mapModel.addGenerator(new Generator(Config.MAP_MAX_X, Config.MAP_MAX_Y, Config.BLANK_TILE, Config.WALL_TILE));
        this.mapModel.build();
        this.initPlayers();

        // initialise value of the model
        this.gameModel.isStarted = true;
        this.gameModel.isFight = false;
        this.gameModel.gameOver = false;
        this.gameModel.playerSelected = 0;
        this.gameModel.notify();
    }

    initPlayers() {
        this.gameModel.players[0].selectedPlayer = true;

        this.gameModel.players.forEach((player) => {
            player.model.position = this.generatePositionPlayer();
            player.model.health = 100;
            player.model.weapon = null;
            player.model.defend = false;
            player.model.playerDirection = PlayerSprite.LEFT;
            player.model.weaponSpriteSelect = 0;
            player.view.weaponView = null;
        });

        this.checkDistancePlayer(this.gameModel.players[0].model, this.gameModel.players[1].model);
    }

    restart() {
        this.start();
    }

    /**
     * Create list of the new player
     *
     * @param {number} numberPlayer
     * @return {Array} : list of the players
     **/
    createPlayers(numberPlayer) {
        let players = [];

        let playersInfo = [
            {
                spriteSheet: './ressources/player.png',
                chest: new ArmorModel(30, './ressources/chestArmor1.png'),
                legs: new ArmorModel(15, './ressources/legsArmor1.png'),
                foot: new ArmorModel(10, './ressources/footArmor1.png'),
            },
            {
                spriteSheet: './ressources/skeleton.png',
                chest: new ArmorModel(30, './ressources/chestArmor2.png'),
                legs: new ArmorModel(15, './ressources/legsArmor2.png'),
                foot: new ArmorModel(10, './ressources/footArmor2.png'),
            },
        ]

        for(let i = 0; i < numberPlayer; i++) {
            let playerSprite = new Image();
            playerSprite.src = playersInfo[i].spriteSheet;

            players.push({
                model : new PlayerModel(this.eventManager, 64, 64, playerSprite, this.mapModel, {}),
                view : new PlayerView(this.gameView.ctx, '')
            });

            players[i].model.chest = playersInfo[i].chest;
            players[i].model.legs = playersInfo[i].legs;
            players[i].model.foot = playersInfo[i].foot;

            // Init default name players
            players[i].model.setName('Player ' + i);
        }

        return players;
    }

    defendPlayerEvent() {
        this.gameModel.getPlayerSelected().model.defend = true;
        this.eventManager.trigger('game.changeRoundEvent');
        this.gameModel.notify();
    }

    /**
     * Event player enter the fight
     **/
    enterFightEvent() {
        // Change position player
        this.gameModel.players[0].model.position.x = 80;
        this.gameModel.players[0].model.position.y = 220;
        this.gameModel.players[0].model.playerDirection = PlayerSprite.RIGHT;
        this.gameModel.players[0].model.weaponSpriteSelect = PlayerSprite.RIGHT;
        if(this.gameModel.players[0].model.weapon && this.gameModel.players[0].view.weaponView){
            this.gameModel.players[0].view.weaponView.spriteSelected = PlayerSprite.RIGHT;
        }

        this.gameModel.players[1].model.position.x = 480;
        this.gameModel.players[1].model.position.y = 220;
        this.gameModel.players[1].model.playerDirection = PlayerSprite.LEFT;
        this.gameModel.players[1].model.weaponSpriteSelect = PlayerSprite.LEFT;
        if(this.gameModel.players[1].model.weapon && this.gameModel.players[1].view.weaponView){
            this.gameModel.players[1].view.weaponView.spriteSelected = PlayerSprite.LEFT;
        }
    }

    /**
     * Generate random position for the player
     * 
     * @param {Array<PlayerView>} players
     * @returns {{x: number, y: number}}
     **/
    generatePositionPlayer() {
        let randomX = Utils.randomNumber(0, Config.MAP_MAX_X - 1);
        let randomY = Utils.randomNumber(0, Config.MAP_MAX_Y - 1);
        
        // Test si un player est déja placer a cette place
        this.gameModel.getPlayers().forEach((player) => {
            let diffPlayerPosition = {
                x : Math.abs(player.model.position.x - randomX),
                y : Math.abs(player.model.position.y - randomY)
            }

            while(randomX === player.model.position.x &&  randomY === player.model.position.y &&  this.mapModel[randomY][randomX] === MapModel.WEAPON_DRAGONSPEAR) {
                randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
                randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);
            }
        });

        while(this.mapModel.collide(randomX, randomY)) {
            randomX = Utils.randomNumber(0, Config.MAP_MAX_X - 1);
            randomY = Utils.randomNumber(0, Config.MAP_MAX_Y - 1);
        }

        return {x: randomX * 32, y:randomY * 32, numberTile: PlayerSprite.RIGHT};
    }

    checkDistancePlayer(player1, player2) {
        let positionPlayer1 = player1.position;
        let positionPlayer2 = player2.position;

        // On calcule la distance entre les deux personnage
        let distanceX = positionPlayer1.x - positionPlayer2.x;
        let distanceY = positionPlayer1.y - positionPlayer2.y;
        let distance = (distanceX + distanceY) / 2;

        while(Math.abs(Math.trunc(distance / 32)) < 3) {
            positionPlayer1 = this.generatePositionPlayer();
            distanceX = positionPlayer1.x - positionPlayer2.x;
            distanceY = positionPlayer1.y - positionPlayer2.y;
            distance = (distanceX + distanceY) / 2;
        }

        this.gameModel.players[0].model.position = positionPlayer1;
    }


    /**
     * Configure the change of a round game
     **/
    changeRoundEvent() {
        const player1 = this.gameModel.getPlayerSelected();
        const player2 = this.gameModel.getPlayerNotSelected();

        /**
         * Detect player conflict
         **/
        if(this.detectPlayerConflict(player1, player2)) {
            this.eventManager.trigger('game.enterFightEvent');
            this.gameModel.isFight = true;
            return true;
        }

        if(this.gameModel.playerSelected === 0) {
            this.gameModel.playerSelected = 1
        }
        else {
            this.gameModel.playerSelected = 0
        }

        this.gameModel.notify();
    }

    /**
     * Game loop
     * @return {boolean} endGame
     **/
    update() {
        let players = this.gameModel.getPlayers();
        let playerSelected = this.gameModel.playerSelected;

        // On affiche la map que si les joueurs peuvent ce déplacer sur la map
        this.mapView.draw(this.mapModel.spriteSheet, this.mapModel.map, this.mapModel.maxTileX, this.mapModel.maxTileY);
        this.mapView.drawEvents(this.mapModel.spriteSheet, this.mapModel.mapEvents, this.mapModel.maxTileX, this.mapModel.maxTileY);

        // Affiche la grille pour le joueur selectionné
        if(!this.gameModel.getPlayerSelected().model.checkIsMovement()) {
            this.gameModel.getPlayerSelected().view.addGridToPlayer(this.mapModel, this.gameModel.getPlayerSelected().model.position);
        }

        for(let i =0; i < this.gameModel.countPlayer(); i++) {
            this.gameModel.getPlayerIndex(i).view.update(this.gameModel.getPlayerModelWithIndex(i), this.map, this.gameModel.getPlayerIndex(i).model.position, this.gameModel.getPlayerIndex(i).model.playerDirection, 1, this.gameModel.getPlayerIndex(i).model.weaponSpriteSelect);
        }

        return true;
    }

    updateFight() {
        this.gameView.draw(this.background, 0, 0, 1104, 621, 0, 0, Config.MAP_MAX_X * 32, Config.MAP_MAX_Y * 32);

        // Affichage des deux joueur
        for(let i = 0; i < this.gameModel.countPlayer(); i++) {
            this.gameModel.getPlayerIndex(i).view.update(this.gameModel.getPlayerModelWithIndex(i), this.map, this.gameModel.getPlayerIndex(i).model.position, this.gameModel.getPlayerIndex(i).model.playerDirection, 2.5, this.gameModel.getPlayerIndex(i).model.weaponSpriteSelect);
        }

        if(this.gameOver() && !this.gameModel.gameOver)
        {
            this.gameModel.gameOver = true;
            let playerDead = this.gameModel.players.filter( player => player.model.isDead());
            this.eventManager.trigger('game.gameOverEvent', null, [playerDead[0].model.username]);
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