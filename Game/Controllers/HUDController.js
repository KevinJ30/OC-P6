import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameStore) {
        this.HUDView = new HUDView();
        this.HUDModel = new HUDModel();
        this.gameStore = gameStore;

        this.handleUpdateGameStore = this.handleUpdateGameStore.bind(this);
        this.gameStore.subscribe(this.handleUpdateGameStore)
    }

    handleUpdateGameStore() {
        this.HUDView.updateDisplay(this.gameStore);
    }
}