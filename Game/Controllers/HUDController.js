import {HUDView} from "../Views/HUDView.js";

export class HUDController {

    constructor(eventManager, gameModel, HUDModel, HUDView) {
        this.HUDView = HUDView;
        this.gameModel = gameModel;
        this.eventManager = eventManager;
        this.hudModel = HUDModel;

        this.bindingMethodOfClass();
        this.allSubscribeToObserver();
        this.gameModel.notify();
        this.hudModel.notify();

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
        this.handleRestartGame = this.handleRestartGame.bind(this);
        this.updateView = this.updateView.bind(this);
        this.handleDropItem = this.handleDropItem.bind(this);
    }

    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
        this.hudModel.subscribe(this.updateView);
        this.eventManager.attach('game.enterFightEvent', this.handleEnterFightEvent, 0);
        this.eventManager.attach('game.gameOverEvent', this.handleGameOverEvent, 0);
        this.eventManager.attach('game.startGameEvent', this.handleStartGameEvent, 0);
        this.eventManager.attach('game.restartGame', this.handleRestartGame, 0);
        this.eventManager.attach('game.dropItemEvent', this.handleDropItem, 0)
    }

    handleUpdateGameStore () {
        this.hudModel.update({
            ...this.hudModel.state,
            playerOneName: this.gameModel.players[0].model.username,
            playerTwoName: this.gameModel.players[1].model.username,
            playerSelectedUsername: this.gameModel.getPlayerSelected().model.username,
            healthPlayerOne: this.gameModel.players[0].model.health,
            healthPlayerTwo: this.gameModel.players[1].model.health,
            gameStart: this.gameModel.isStarted,
            playerSelectedNumber: this.gameModel.playerSelected,
            players: this.gameModel.getPlayers()
        });

        this.hudModel.notify();
    }

    handleStartGameEvent () { 
        this.hudModel.toggleDisplayGameContainer();
        this.HUDView.drawInformation('Renforcer vous avant de vous battre !')
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

    handleDropItem(positionWeapon, player) {
        const weapon = player.weapon;
        this.HUDView.drawInformation('Vous venez de ramasser ' + weapon.name + '. Cette arme inflige ' + weapon.damage + ' dégats !');
    }

    handleEnterFightEvent() {
        this.hudModel.toggleIsFight();
    }

    handleGameOverEvent() {
        this.hudModel.toggleGameOverScreen();
    }

    handleRestartGame() {
        this.hudModel.toggleRestartGame();
    }

    updateView() {
        this.HUDView.update(this.hudModel.state);
    }
}