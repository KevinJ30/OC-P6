import {Observer} from '../Observer/Observer.js';

/**
 * Classe HUDModel créer par Joudrier Kevin
 * 
 * @property {Object} state : Représente l'état des données du jeu
 **/
export class HUDModel extends Observer {

    constructor() {
        super();

        this.state = {
            /**
             * @property {boolean} displayGameContainer : Affiche ou masque le container du HUD
             **/
            displayGameContainer: false,

            /**
             * @property {string} playerOneName : Nom du joueur 1
             **/
            playerOneName: "Player 1",

            /**
             * @property {string} playerTwoName : Nom du deuxième joueur
             **/
            playerTwoName: "Player 2",

            /**
             * @property {string} playerSelectedUsername : Nom du joueur séléctionné
             **/
            playerSelectedUsername: "Player 1",

            /**
             * @property {number} healthPlayerOne : Point de vie du joueur 1
             **/
            healthPlayerOne : 0,

            /**
             * @property {number} healthPlayerTwo : Point de vid du joueur 2
             **/
            healthPlayerTwo: 0,

            /**
             * @property {boolean} displayInformations : Affichage des messages
             **/
            displayInformations: false,

            /**
             * @property {string} textInformations : Texte contenu dans le champ information
             **/
            textInformations : "Aucune information",

            /**
             * @property {boolean} isFight : Etat de la phase de combat
             **/
            isFight: false,

            /**
             * @property {boolean} gameStart : Etat du démarrage de la partie
             **/
            gameStart: false,

            /**
             * @property {number} playerSelectedNumber : Numéro du joueur séléctionné
             **/
            playerSelectedNumber : 0,

            /**
             * @property {array} players : Liste des joueurs
             **/
            players: []
        }   
    }

    /**
     * Affiche ou masque les informations pendant la partie
     * 
     * @return {void} 
     **/
    toggleDisplayInformations() {
        this.state.displayInformations = !this.displayInformations;
        this.notify();
    }

    /**
     * Affiche ou masque le conteneur du jeu
     * 
     * @return {void}
     **/
    toggleDisplayGameContainer() {
        this.update({
            ...this.state,
            displayGameContainer: !this.state.displayGameContainer
        });

        this.notify();
    }

    /**
     * Active ou désactive la phase de combat
     * 
     * @return {void}
     **/
    toggleIsFight() {
        this.update({
            ...this.state,
            isFight: !this.state.isFight
        });

        this.notify();
    }

    /**
     * Affiche ou masque la fin de la partie
     * 
     * @return {void}
     **/
    toggleGameOverScreen() {
        this.update({
            ...this.state,
            isFight: false,
            displayGameContainer: false
        });

        this.notify();
    }

    /**
     * Change l'état du jeu pour rédémarrer une partie
     * 
     * @return {void}
     **/
    toggleRestartGame() {
        this.update({
            ...this.state,
            isFight: false,
            displayGameContainer: true
        });

        this.notify();
    }

    /**
     * Met a jour l'état du HUD
     * 
     * @param {Object} newState 
     **/
    update(newState) {
        this.state = newState;
    }

}