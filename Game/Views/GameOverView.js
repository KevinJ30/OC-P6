/**
 * Classe GameOverView créer par Joudrier Kevin
 * 
 * @property {HTMLElement} HUDContainer : Elément qui tous les éléments HTML du HUD
 * @property {HTMLElement} usernameElement : Elément qui contient le nom du joueur qui a perdu
 * @property {HTMLElement} restartButtonElement : Elément bouton restart
 **/
export class GameOverView {

    /**
     * @property {string} CLASS_HIDDEN : Nom de la class qui permet de masquer les éléments
     **/
    static CLASS_HIDDEN = 'hidden'

    /**
     * Constructeur.
     **/
    constructor() {
        // Séléction des éléments HTML
        this.HUDContainer = $('.HUD__game-over');
        this.usernameElement = $('.js-usernameElement');

        // Ajouts des classes par défaut
        this.HUDContainer.addClass('hidden');

        this.restartButtonElement = this.createRestartButtonElement();

        // Ajouts des éléments dans le conteneur HUD
        this.HUDContainer.append(this.restartButtonElement);
    }

    /**
     * Construit le bouton restart du menu game over
     * 
     * @return {HTMLElement} Bouton restart
     **/
    createRestartButtonElement() {
        return $('<button class="btn btn-primary">Relancer une partie</button>')
    }

    /**
     * Affiche ou masque le menu game over
     * 
     * @return {void}
     **/
    toggleDisplay() {
        this.HUDContainer.toggleClass(GameOverView.CLASS_HIDDEN);
    }

    /**
     * Lie le bouton restart a la méthode handleButtonRestart du controller
     * 
     * @param {function} handler 
     * @return {void}
     **/
    bindButtonRestart(handler) {
        this.restartButtonElement.click((event) => {
            event.preventDefault();
            handler();
        })
    }

    /**
     * Met à jour l'élement username
     * 
     * @param {string} playerDead 
     * @return {void}
     **/
    updateUsername(playerDead) {
        this.usernameElement.text(playerDead);
    }
}