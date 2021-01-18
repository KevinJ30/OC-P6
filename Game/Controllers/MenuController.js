export class MenuController {
    
    constructor (gameStore, model, view) {
        this.model = model;
        this.view = view;
        this.gameStore = gameStore;

        /**
         * Bind handle
         **/
        this.view.bindButtonStartGame(this.handleButtonStartGame);
    }

    handleButtonStartGame = () => {
        console.log(this.gameStore);
        this.view.displayMenu();
    }

}