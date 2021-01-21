import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameModel, roundObserver, attackEvent, defendEvent, gameOverObserver, enterFightObserver) {
        this.HUDView = new HUDView();
        this.HUDModel = new HUDModel();
        this.gameModel = gameModel;
        this.roundObserver = roundObserver;
        this.attackEvent = attackEvent;
        this.defendEvent = defendEvent;
        this.gameOverObserver = gameOverObserver;
        this.enterFightObserver = enterFightObserver;

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
        this.handleGameOverEvent = this.handleGameOverEvent.bind(this);
        this.handleEnterFightEvent = this.handleEnterFightEvent.bind(this);
    }

    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
        this.gameOverObserver.subscribe(this.handleGameOverEvent);
        this.enterFightObserver.subscribe(this.handleEnterFightEvent);
    }

    handleUpdateGameStore () {
        this.HUDView.updateDisplay(this.gameModel);
    }

    handleAttackPlayer() {
        let playerNotSelected = this.gameModel.getPlayerNotSelected();
        let playerSelected = this.gameModel.getPlayerSelected();

        playerNotSelected.model.receiveDamage(playerSelected.model.getDamage());
        playerSelected.view.animateAttack(playerSelected.model, playerSelected.model.position, 2.5);
        playerNotSelected.view.animateDamage(playerNotSelected.model);
        this.roundObserver.notify();
        this.gameModel.notify();
    }

    handleDefendPlayer() {
        this.defendEvent.notify();
    }

    handleGameOverEvent() {
        this.HUDView.displayGameOver();
    }

    handleEnterFightEvent() {
        this.HUDView.displayFightHUD();
    }
}