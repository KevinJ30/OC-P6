import {Observer} from "../Observer/Observer.js";

/**
 * Classe GameModel créer par Joudrier Kevin
 *
 * @property {Map} map : Tableaux contenant les données de la map
 * @property {Array} players : Tableaux contenant les joueurs de la partie
 * @property {number} playerSelected : Joueur séléctionner pendant la partie
 * @property {boolean} isStarted : Statue correspondant au lancement de la partie
 * @property {boolean} isFight : Statue correspondant a la phase de combat
 **/
export class GameModel extends Observer {

    constructor() {
        super();

        this.map = null;
        this.players = [];
        this.playerSelected = 0;
        this.isStarted = false;
        this.isFight = false;
        this.gameOver = false;
    }

    /**
     * Ajoute un joueur
     * 
     * @param {{view: PlayerView, model: PlayerModel}} player
     * @return {void}
     **/
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * Retourne le joueur par son index dans le tableaux
     * 
     * @param {number} index
     * @returns {Object}
     **/
    getPlayerIndex(index) {
        return this.players[index];
    }

    /**
     * Retourne le tableau de joueur
     * 
     * @returns {Array}
     **/
    getPlayers() {
        return this.players;
    }

    /**
     * Retourne le joueur séléctionné
     * 
     * @returns {Object}
     **/
    getPlayerSelected() {
        return this.players[this.playerSelected];
    }

    /**
     * Retourne le joueur qui n'est pas selectionné
     * 
     * @returns {Object}
     **/
    getPlayerNotSelected(){
        return this.players[this.playerSelected ? 0 : 1];
    }

    /**
     * Retourne le nombre de dans la partie
     * 
     * @returns {number}
     **/
    countPlayer() {
        return this.players.length;
    }

    /**
     * Retourne le model du joueur par son index
     * 
     * @param index
     **/
    getPlayerModelWithIndex(index) {
        return this.players[index].model;
    }

    /**
     * Retourne si la partie est démarré
     * 
     * @returns {boolean}
     **/
    getIsStarted() {
        return this.isStarted;
    }

    /**
     * Retourne si le jeu est en phase de combat
     * 
     * @returns {boolean}
     */
    getIsFight() {
        return this.isFight;
    }
}