export class GameStore {

    static getInstance () {
        if(!this.instance) {
            this.instance = new GameStore();
        }

        return this.instance;
    }

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