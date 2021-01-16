export class HUDView {

    constructor() {
        //this.HUDContainer = document.querySelector('.js-HUD');
        this.HUDContainer = $('.js-HUD');
        /**
         * create player 1
         **/

        this.HUDContainerPlayerOne = $('<div></div>').addClass('js-hud__player-1').append('<p></p>');
        this.HUDContainerPlayerTwo = $('<div></div>').addClass('js-hud__player-2').append('<p></p>');

        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);

        /**this.HUDContainerPlayerOne.append(this.playerOneNameElement);
        this.HUDContainerPlayerTwo.append(this.playerTwoNameElement);**/
        this.playerOneNameElement = $('.js-hud__player-1').children()
        this.playerTwoNameElement = $('.js-hud__player-2').children()
    }

    updateDisplay(gameStore) {
        console.log(gameStore.getState());
        this.playerOneNameElement.text(gameStore.getState().players[0].model.name);
        this.playerTwoNameElement.text(gameStore.getState().players[1].model.name);
    }
}