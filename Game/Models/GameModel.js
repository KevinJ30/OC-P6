import {Observer} from "../Observer/Observer.js";

export class GameModel extends Observer {

    constructor() {
        super();

        this.map = null;
        this.players = [];
        this.playerSelected = 0;
        this.isStarted = false;
        this.isFight = false;
    }


}