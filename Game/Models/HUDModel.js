import {Observer} from '../Observer/Observer.js';


export class HUDModel extends Observer {

    constructor() {
        super();

        this.state = {
            displayGameContainer: false,
            playerOneName: "Player 1",
            playerTwoName: "Player 2",
            playerSelectedUsername: "Player 1",
            healthPlayerOne : 0,
            healthPlayerTwo: 0,
            displayInformations: false,
            textInformations : "Aucune information",
            isFight: false,
            gameStart: false,
            playerSelectedNumber : 0
        }   
    }

    toggleDisplayInformations() {
        this.state.displayInformations = !this.displayInformations;
        this.notify();
    }

    toggleDisplayGameContainer() {
        this.update({
            ...this.state,
            displayGameContainer: !this.state.displayGameContainer
        });

        this.notify();
    }

    toggleIsFight() {
        this.update({
            ...this.state,
            isFight: !this.state.isFight
        });

        this.notify();
    }

    toggleGameOverScreen() {
        this.update({
            ...this.state,
            isFight: false,
            displayGameContainer: false
        });

        this.notify();
    }

    toggleRestartGame() {
        this.update({
            ...this.state,
            isFight: false,
            displayGameContainer: true
        });

        this.notify();
    }

    update(newState) {
        this.state = newState;
    }

}