/**
 * classe MenuView créer par Joudrier Kevin
 * 
 * @property {HTMLElement} menuContainer : Contient tous les éléments HTML du menu
 * @property {HTMLElement} fieldPlayerOneNameElement : Champs permettant d'indiquer le nom du joueur 1
 * @property {HTMLElement} fieldPlayerTwoNameElement : Champs permettant d'indiquer le nom du joueur 2
 * @property {HTMLElement} buttonStartElement : Bouton correspondant au démarrage de la partie
 **/
export class MenuView {

    constructor() {
        this.drawView();
    }

    /**
     * Affiche les éléments HTML du menu
     * 
     * @return {void}
     **/
    drawView() {
        this.menuContainer = $('.menu_game');

        this.fieldPlayerOneNameElement = this.createField('text', 'playerNameOne', 'Joueur 1', 'input js-playerFieldNameOne');
        this.fieldPlayerTwoNameElement = this.createField('text', 'playerNameTwo', 'Joueur 2', 'input js-playerFieldNameTwo');
        this.buttonStartElement = this.createButton('Démarrer le jeu', 'btn btn-primary');

        this.menuContainer.append(this.fieldPlayerOneNameElement)
        this.menuContainer.append(this.fieldPlayerTwoNameElement)
        this.menuContainer.append(this.buttonStartElement)
    }

    /**
     * Affiche ou masque le menu du jeu
     * 
     * @return {void}
     **/
    displayMenu() {
        this.menuContainer.toggleClass('hidden');
    }

    /**
     * Lie l'événement du bouton clique a la méthode du controller
     * 
     * @param {CallableFunction} handler
     * @return {void}
     **/
    bindButtonStartGame(handler) {
        this.buttonStartElement.click((event) => {
            event.preventDefault()
            handler();
        })
    }

    /**
     * Créer un champs HTML
     *
     * @param {string} type : Type de champ
     * @param {string} name : Nom du champ
     * @param {string} placeholder
     * @param {string} classes : Toutes les classes du champ
     * @return {HTMLInputElement}
     */
    createField(type, name, placeholder, classes) {
        let fieldElement = $('<input />');
        fieldElement.attr('type', type);
        fieldElement.attr('name', name);
        fieldElement.attr('placeholder', placeholder);
        fieldElement.addClass(classes);

        return fieldElement;
    }

    /**
     * Créer un bouton HTML
     * 
     * @param value : Text du bouton
     * @param classes : Toutes les classes du bouton
     * @return {HTMLButtonElement}
     **/
    createButton(value, classes) {
        let buttonElement = $('<button></button>');
        buttonElement.addClass(classes);
        buttonElement.text(value);

        return buttonElement;
    }
}