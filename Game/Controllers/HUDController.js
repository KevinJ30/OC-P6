import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameModel) {
        this.HUDView = new HUDView();
        this.HUDModel = new HUDModel();
        this.gameModel = gameModel;

        this.bindingMethodOfClass();
        this.allSubscribeToObserver();
        this.gameModel.notify()
    }

    bindingMethodOfClass() {
        this.handleUpdateGameStore = this.handleUpdateGameStore.bind(this);
    }

    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
    }

    handleUpdateGameStore () {
        this.HUDView.updateDisplay(this.gameModel);
    }
}