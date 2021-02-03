import {HUDView} from "../Views/HUDView.js";
import {HUDModel} from "../Models/HUDModel.js";

export class HUDController {

    constructor(eventManager, gameModel, defendEvent, enterFightObserver) {
        this.HUDView = new HUDView();
        this.gameModel = gameModel;
        this.eventManager = eventManager;

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
        this.handleEnterFightEvent = this.handleEnterFightEvent.bind(this);
        this.handleStartGameEvent = this.handleStartGameEvent.bind(this);
        this.handleGameOverEvent = this.handleGameOverEvent.bind(this);
    }

    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
        this.eventManager.attach('game.enterFightEvent', this.handleEnterFightEvent, 0);
        this.eventManager.attach('game.startGameEvent', this.handleStartGameEvent, 0);
        this.eventManager.attach('game.gameOverEvent', this.handleGameOverEvent, 0);
        this.eventManager.attach('game.restartGame', this.handleGameOverEvent, 0);
    }

    handleUpdateGameStore () {
        this.HUDView.updateDisplay(this.gameModel);

        if(!this.gameModel.isFight) {
            this.HUDView.hiddenHUDFight();
        }
    }

    handleStartGameEvent () {
        this.HUDView.displayGameScreen();
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

        this.eventManager.trigger('game.changeRoundEvent');
        this.gameModel.notify();
    }

    handleDefendPlayer() {
        this.eventManager.trigger('game.defendPlayerEvent');
    }

    handleEnterFightEvent() {
        this.HUDView.displayFightHUD();
    }

    handleGameOverEvent() {
        this.HUDView.toggleGameScreen();
    }
}