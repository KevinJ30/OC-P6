export class MenuView {

    constructor() {
        this.drawView();
    }

    drawView() {
        this.menuContainer = $('.menu_game');

        this.fieldPlayerOneNameElement = this.createField('text', 'playerNameOne', 'Joueur 1', 'input js-playerFieldNameOne');
        this.fieldPlayerTwoNameElement = this.createField('text', 'playerNameTwo', 'Joueur 2', 'input js-playerFieldNameTwo');
        this.buttonStartElement = this.createButton('Démarrer le jeu', 'btn btn-primary');

        this.menuContainer.append(this.fieldPlayerOneNameElement)
        this.menuContainer.append(this.fieldPlayerTwoNameElement)
        this.menuContainer.append(this.buttonStartElement)
    }

    displayMenu() {
        this.menuContainer.toggleClass('hidden');
    }

    bindButtonStartGame(handler) {
        this.buttonStartElement.click((event) => {
            event.preventDefault()
            handler();
        })
    }

    /**
     * Create field
     *
     * @param {string} type
     * @param {string} name
     * @param {string} placeholder
     * @param {string} classes
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
     * Create button element
     * @param value
     * @param classes
     **/
    createButton(value, classes) {
        let buttonElement = $('<button></button>');
        buttonElement.addClass(classes);
        buttonElement.text(value);

        return buttonElement;
    }
}