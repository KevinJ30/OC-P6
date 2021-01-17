export class HUDView {

    constructor() {
        this.HUDContainer = $('.js-HUD');

        /**this.HUDContainerPlayerOne = $('<div></div>').addClass('js-player-hud-1');
        this.HUDContainerPlayerTwo = $('<div></div>').addClass('js-player-hud-2');

        this.playerOneNameElement = $('<p><p>').addClass('js-player1-name');
        //this.playerTwoNameElement = $('<p><p>').addClass('js-player2-name');

        /**this.HUDContainerPlayerOne.append(this.playerOneNameElement)
        this.HUDContainerPlayerTwo.append(this.playerTwoNameElement)

        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);
        this.HUDContainerPlayerOne.append(this.playerOneNameElement);
        this.HUDContainerPlayerTwo.append(this.playerTwoNameElement);

        this.HUDContainer.append(this.HUDContainerPlayerOne);**/

        this.HUDContainerPlayerOne = $('<div></div>').addClass('js-player-hud-1').append('<p></p>');
        this.HUDContainerPlayerTwo = $('<div></div>').addClass('js-player-hud-2').append('<p></p>');
        this.playerOneNameElement = this.HUDContainerPlayerOne.children().addClass('js-player1-name')
        this.playerTwoNameElement = this.HUDContainerPlayerTwo.children().addClass('js-player2-name')

        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);
    }

    updateDisplay(gameStore) {
        this.playerOneNameElement.text(gameStore.getState().players[0].model.username + ' ' + gameStore.getState().players[0].model.health);
        this.playerTwoNameElement.text(gameStore.getState().players[1].model.username + ' ' + gameStore.getState().players[1].model.health);
    }
}