import {Observer} from "../Observer/Observer.js";

export class GameOverModel {

    constructor() {
        this.hidden = false;
    }

    toggleDisplay() {
        this.hidden = !this.hidden;
    }

}