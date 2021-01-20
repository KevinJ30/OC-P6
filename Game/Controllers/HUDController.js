import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameModel, attackEvent, defendEvent) {
        this.HUDView = new HUDView();
        this.HUDModel = new HUDModel();
        this.gameModel = gameModel;
        this.attackEvent = attackEvent;
        this.defendEvent = defendEvent;

        this.bindingMethodOfClass();
        this.allSubscribeToObserver();
        this.gameModel.notify();

        this.HUDView.bindButtonAttack(this.handleAttackPlayer);
        this.HUDView.bindButtonDefend(this.handleDefendPlayer);
    }

    bindingMethodOfClass() {
        this.handleUpdateGameStore = this.handleUpdateGameStore.bind(this);
        this.handleAttackPlayer = this.handleAttackPlayer.bind(this);
        this.handleDefendPlayer = this.handleDefendPlayer.bind(this);
    }

    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
    }

    handleUpdateGameStore () {
        this.HUDView.updateDisplay(this.gameModel);
    }

    handleAttackPlayer() {
        this.attackEvent.notify();
    }

    handleDefendPlayer() {
        this.defendEvent.notify();
    }
}