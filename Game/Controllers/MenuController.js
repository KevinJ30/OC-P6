export class MenuController {
    
    constructor (eventManager, gameModel, model, view) {
        this.model = model;
        this.view = view;
        this.gameModel = gameModel;
        this.eventManager = eventManager;
        this.bindEventHandler();
    }

    bindEventHandler() {
        this.view.bindButtonStartGame(this.handleButtonStartGame);
    }

    handleButtonStartGame = () => {
        this.gameModel.players[0].model.username = this.view.fieldPlayerOneNameElement.val();
        this.gameModel.players[1].model.username = this.view.fieldPlayerTwoNameElement.val();
        this.gameModel.notify();
        this.view.displayMenu();
        this.eventManager.trigger('game.startGameEvent');

    }

}