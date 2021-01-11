export class MenuController {
    
    constructor (model, view) {
        this.model = model;
        this.view = view;

        /**
         * Bind handle
         **/
        this.view.bindButtonStartGame(this.handleButtonStartGame);
    }

    handleButtonStartGame = () => {
        this.view.displayMenu();
    }

}