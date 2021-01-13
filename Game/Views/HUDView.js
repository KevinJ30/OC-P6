export class HUDView {

    constructor() {
        this.HUDContainer = $('.js-HUD');
        /**
         * create player 1
         **/
        this.HUDContainerPlayerOne = $('div').addClass('.js-hud__player-1');
        this.HUDContainerPlayerTwo = $('div').addClass('.js-hud__player-2');

        this.playerOneNameElement = $('<p></p>').text = 'kevin';
        this.playerTwoNameElement = $('<p></p>').text = 'kevin2';

        this.HUDContainerPlayerOne.append(this.playerOneNameElement);
        this.HUDContainerPlayerTwo.append(this.playerTwoNameElement);

        // Add all element to the container
        //this.HUDContainer.append(this.HUDContainerPlayerOne);
        //this.HUDContainer.append(this.HUDContainerPlayerTwo);
    }

}