export class GameStore {

    constructor() {
        this.state = {}
    }

    update(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}