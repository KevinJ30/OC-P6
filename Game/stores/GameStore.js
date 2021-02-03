import {Observer} from "../Observer/Observer.js";

export class GameStore extends Observer {

    constructor() {
        super();

        this.state = {
            playerSelected: 0,
            players: []
        }
    }

    update(state) {
        this.state = state;
        this.notify()
    }

    getState() {
        return this.state;
    }

    /**
     * Add player in the store and notify
     * @param {{view: PlayerView, model: PlayerModel}} player
     **/
    addPlayer(player) {
        this.state.players.push(player);
        this.notify()
    }

    getPlayerIndex(index) {
        return this.state.players[index];
    }

    getPlayers() {
        return this.state.players;
    }

    getPlayerSelected() {
       return this.state.players[this.state.playerSelected];
    }

    getNotSelectedPlayer() {
        return this.state.players[this.state.playerSelected ? 0 : 1];
    }

    getPlayerModelWithIndex(index) {
        return this.state.players[index].model;
    }

    getPlayerViewWithIndex(index) {
        return this.state.players[index].view;
    }

    gameIsStarted() {
        return this.state.start;
    }

    countPlayer() {
        return this.state.players.length;
    }
}