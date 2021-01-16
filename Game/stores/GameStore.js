import {Observer} from "../Observer/Observer.js";

export class GameStore extends Observer {

    constructor() {
        super();
        this.state = {}
    }

    update(state) {
        this.state = state;
        this.notify()
    }

    getState() {
        return this.state;
    }
}