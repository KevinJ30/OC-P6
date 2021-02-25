/**
 * Classe GameOverController créer par Joudrier Kevin
 **/
export class GameOverController {

    /**
     * @param {EventManager} eventManager 
     * @param {GameOverModel} gameOverModel 
     * @param {GameOverView} gameOverView 
     **/
    constructor(eventManager, gameOverModel, gameOverView) {
        this.eventManager = eventManager;
        this.gameOverModel = gameOverModel;
        this.gameOverView = gameOverView;

        this.bindingMethodOfClass();

        this.eventManager.attach('game.gameOverEvent', this.handleDisplay, 0);
        this.eventManager.attach('game.restartGame', this.handleDisplay, 0);
    }

    /**
     * Bind la classe sur les méthode des événements
     * 
     * @return {void}
     **/
    bindingMethodOfClass() {
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleButtonRestart = this.handleButtonRestart.bind(this);
        this.gameOverView.bindButtonRestart(this.handleButtonRestart);
    }

    /**
     * Evénement display
     * Déclenché par l'event manager
     * 
     * @param {string} playerDead : Nom du joueur qui est mort 
     **/
    handleDisplay(playerDead) {
        this.gameOverView.toggleDisplay();
        this.gameOverView.updateUsername(playerDead)
    }

    /**
     * Evénement bouton redémarrage de la partie
     * Déclenché par la vue GameOverView
     * 
     * @return {void}
     **/
    handleButtonRestart() {
        this.eventManager.trigger('game.restartGame');
    }

}