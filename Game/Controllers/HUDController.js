/**
 * Classe HUDController créer par Joudrier Kevin
 * 
 * @property {HUDView} HUDView
 * @property {GameModel} gameModel
 * @property {EventManager} eventManager
 * @property {HUDModel} hudModel
 **/
export class HUDController {

    /**
     * @param {EventManager} eventManager 
     * @param {GameModel} gameModel 
     * @param {HUDModel} HUDModel 
     * @param {HUDView} HUDView 
     */
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

    /**
     * Bind la classe sur les méthode des événements
     * 
     * @return {void}
     **/
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

    /**
     * Souscription a tous les observer et attachement a tous les événement
     * 
     * @return {void}
     **/
    allSubscribeToObserver() {
        this.gameModel.subscribe(this.handleUpdateGameStore)
        this.hudModel.subscribe(this.updateView);
        this.eventManager.attach('game.enterFightEvent', this.handleEnterFightEvent, 0);
        this.eventManager.attach('game.gameOverEvent', this.handleGameOverEvent, 0);
        this.eventManager.attach('game.startGameEvent', this.handleStartGameEvent, 0);
        this.eventManager.attach('game.restartGame', this.handleRestartGame, 0);
        this.eventManager.attach('game.dropItemEvent', this.handleDropItem, 0)
    }

    /**
     * Fonction souscrite a l'observer du game model
     * 
     * @return {void}
     **/
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

    /**
     * Evénement du bouton démarrage de la partie
     * 
     * @return {void}
     **/
    handleStartGameEvent () { 
        this.hudModel.toggleDisplayGameContainer();
        this.HUDView.drawInformation('Renforcer vous avant de vous battre !')
    }

    /**
     * Evénement du bouton attaque
     * 
     * @return {void}
     **/
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

    /**
     * Evénement du bouton Defense
     * 
     * @return {void}
     **/
    handleDefendPlayer() {
        this.eventManager.trigger('game.defendPlayerEvent');
    }

    /**
     * Evénment quand on ramasse un trésor de guerre
     * Déclencher par l'event manager
     * 
     * @param {Object} positionWeapon 
     * @param {PlayerModel} player 
     * @return {void}
     **/
    handleDropItem(positionWeapon, player) {
        const weapon = player.weapon;
        this.HUDView.drawInformation('Vous venez de ramasser ' + weapon.name + '. Cette arme inflige ' + weapon.damage + ' dégats !');
    }

    /**
     * Evénement quand on entre dans la phase de combat
     * Déclencher par l'event manager
     * 
     * @return {void}
     **/
    handleEnterFightEvent() {
        this.hudModel.toggleIsFight();
    }

    /**
     * Evénement quand la partie est terminé
     * Déclencher par l'event manager
     * 
     * @return {void}
     **/
    handleGameOverEvent() {
        this.hudModel.toggleGameOverScreen();
    }

    /**
     * Evénement rechargement de la partie
     * Déclencher par l'évent manager
     **/
    handleRestartGame() {
        this.hudModel.toggleRestartGame();
    }

    /**
     * Met a jour les informations de la vue
     * Déclenché quand les données du HUD change
     * 
     * @return {void}
     **/
    updateView() {
        this.HUDView.update(this.hudModel.state);
    }
}