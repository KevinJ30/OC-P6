export class HUDView {

    constructor() {
        this.HUDContainer = $('.js-HUD');

        this.HUDContainerPlayerOne = $('<div></div>').addClass('js-hud__player-1').append('<p></p>');
        this.HUDContainerPlayerTwo = $('<div></div>').addClass('js-hud__player-2').append('<p></p>');

        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);

        this.playerOneNameElement = $('.js-hud__player-1').children()
        this.playerTwoNameElement = $('.js-hud__player-2').children()
    }

    updateDisplay(gameStore) {
        this.playerOneNameElement.text(gameStore.getState().players[0].model.username + ' ' + gameStore.getState().players[0].model.health);
        this.playerTwoNameElement.text(gameStore.getState().players[1].model.username + ' ' + gameStore.getState().players[1].model.health);
    }
}