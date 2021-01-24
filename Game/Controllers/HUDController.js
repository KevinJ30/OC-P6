import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(gameModel, roundObserver, attackEvent, defendEvent, gameOverObserver, enterFightObserver) {
        this.HUDView = new HUDView();
        this.gameModel = gameModel;
        this.roundObserver = roundObserver;
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
        this.startGameEvent = this.startGameEvent.bind(this);
    }

    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
        this.gameOverObserver.subscribe(this.handleGameOverEvent);
        this.enterFightObserver.subscribe(this.handleEnterFightEvent);
        this.gameModel.subscribe(this.startGameEvent);
    }

    startGameEvent() {
        console.log(this.gameModel.isStarted, this.gameModel.gameOver)
        if(this.gameModel.isStarted && this.gameModel.gameOver !== false) {
            // On affiche la game screen
            this.HUDView.HUDContainer.addClass('hidden');
            console.log('startGame');
        }
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

        if(playerNotSelected.model.defend) {
            playerNotSelected.model.defend = !playerNotSelected.model.defend;
        }

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