import {Observer} from "../Observer/Observer.js";

/**
 * Manage data of the GameController
 * class GameModel
 *
 * @property {Map} map
 * @property {Array} players
 * @property {number} playerSelected
 * @property {boolean} isStarted
 * @property {boolean} isFight
 **/
export class GameModel extends Observer {

    constructor() {
        super();

        this.map = null;
        this.players = [];
        this.playerSelected = 0;
        this.isStarted = false;
        this.isFight = false;
    }

    /**
     *
     * @param {{view: PlayerView, model: PlayerModel}} player
     **/
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     *
     * @param {number} index
     * @returns {Object}
     **/
    getPlayerIndex(index) {
        return this.players[index];
    }

    /**
     * Return array of the player
     * @returns {Array}
     **/
    getPlayers() {
        return this.players;
    }

    /**
     * Return player selected
     * @returns {Object}
     **/
    getPlayerSelected() {
        return this.players[this.playerSelected];
    }

    /**
     * Return the player who is not selected
     * @returns {Object}
     **/
    getPlayerNotSelected(){
        return this.players[this.playerSelected ? 0 : 1];
    }

    /**
     * return number of the player
     * @returns {number}
     **/
    countPlayer() {
        return this.players.length;
    }

    /**
     * Return model with player selected index
     * @param index
     **/
    getPlayerModelWithIndex(index) {
        return this.players[index].model;
    }

    /**
     * Return the game started
     * @returns {boolean}
     **/
    getIsStarted() {
        return this.isStarted;
    }

    /**
     * Return if the game is in combat stage
     * @returns {boolean}
     */
    getIsFight() {
        return this.isFight;
    }
}