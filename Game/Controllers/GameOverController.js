export class GameOverController {

    constructor(eventManager, gameOverModel, gameOverView) {
        this.eventManager = eventManager;
        this.gameOverModel = gameOverModel;
        this.gameOverView = gameOverView;

        this.bindingMethodOfClass();

        this.eventManager.attach('game.gameOverEvent', this.handleDisplay, 0);
    }

    bindingMethodOfClass() {
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleButtonRestart = this.handleButtonRestart.bind(this);
        this.gameOverView.bindButtonRestart(this.handleButtonRestart);
    }

    handleDisplay(playerDead) {
        this.gameOverView.toggleDisplay(this.gameOverModel.hidden);
        this.gameOverView.updateUsername(playerDead)
    }

    handleButtonRestart() {
        this.eventManager.trigger('game.restartGame');
    }

}