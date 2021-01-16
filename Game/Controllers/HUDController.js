import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameStore) {
        this.HUDView = new HUDView();
        this.HUDModel = new HUDModel();
        this.gameStore = gameStore;

        this.gameStore.subscribe(this.handleUpdateGameStore(this.HUDModel.gameStore))
    }

    handleUpdateGameStore() {
        this.HUDView.updateDisplay(this.gameStore);
    }
}