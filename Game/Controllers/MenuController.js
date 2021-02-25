/**
 * Classe MenuController créer par Joudrier Kevin
 * 
 * @property {MenuView} menuView
 * @property {GameModel} gameModel : Modèle du jeu
 * @property {EventManager} eventManager : Liste des événement
 **/
export class MenuController {
    
    /**
     * @param {*} eventManager 
     * @param {*} gameModel 
     * @param {*} menuView 
     **/
    constructor (eventManager, gameModel, menuView) {
        this.menuView = menuView;
        this.gameModel = gameModel;
        this.eventManager = eventManager;
        this.bindEventHandler();
    }

    /**
     * Lie l'évément du bouton startGame
     **/
    bindEventHandler() {
        this.menuView.bindButtonStartGame(this.handleButtonStartGame);
    }

    /**
     * Evénement du bouton start game
     **/
    handleButtonStartGame = () => {
        this.gameModel.players[0].model.username = this.menuView.fieldPlayerOneNameElement.val();
        this.gameModel.players[1].model.username = this.menuView.fieldPlayerTwoNameElement.val();
        this.gameModel.isStarted = true;
        this.gameModel.notify();

        this.menuView.displayMenu();

        this.eventManager.trigger('game.startGameEvent');
    }

}