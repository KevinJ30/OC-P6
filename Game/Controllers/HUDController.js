import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameStore) {
        this.HUDView = new HUDView();
        this.HUDModel = new HUDModel();
        this.gameStore = gameStore;

        this.gameStore.subscribe(this.handleUpdateGameStore)
        this.gameStore.notify()
    }

    handleUpdateGameStore = () => {
        this.HUDView.updateDisplay(this.gameStore);
    }
}