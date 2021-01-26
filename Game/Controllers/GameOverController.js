export class GameOverController {

    constructor(eventManager, gameOverModel, gameOverView) {
        this.eventManager = eventManager;
        this.gameOverModel = gameOverModel;
        this.gameOverView = gameOverView;
        this.handleDisplay = this.handleDisplay.bind(this);
        this.eventManager.attach('game.gameOverEvent', this.handleDisplay, 0);
        this.gameOverView.toggleDisplay(this.gameOverModel.hidden);
    }

    handleDisplay() {
        this.gameOverView.toggleDisplay(this.gameOverModel.hidden);
    }

}