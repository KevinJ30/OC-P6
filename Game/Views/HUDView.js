export class HUDView {

    constructor() {
        this.HUDContainer = $('.js-HUD');

        this.HUDContainerPlayerOne = $('<div></div>').addClass('player-hud js-player-hud-1').append('<p></p>');
        this.HUDContainerPlayerTwo = $('<div></div>').addClass('player-hud js-player-hud-2').append('<p></p>');
        this.playerOneNameElement = this.HUDContainerPlayerOne.children().addClass('player-name js-player1-name');
        this.playerTwoNameElement = this.HUDContainerPlayerTwo.children().addClass('player-name js-player2-name');
        this.HUDContainerPlayerOne.append('<progress class="health-bar js-hud__health-player1" value="0" max="100"></progress>')
        this.HUDContainerPlayerTwo.append('<progress class="health-bar js-hud__health-player1" value="0" max="100"></progress>')

        this.playerOneProgressElement = this.HUDContainerPlayerOne.children().last();
        this.playerTwoProgressElement = this.HUDContainerPlayerTwo.children().last();

        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);
    }

    updateDisplay(gameModel) {
        this.playerOneNameElement.text(gameModel.players[0].model.username + ' ' + gameModel.players[0].model.health);
        this.playerTwoNameElement.text(gameModel.players[1].model.username + ' ' + gameModel.players[1].model.health);

        // Connect value progress bar
        this.playerOneProgressElement.val(gameModel.players[0].model.health);
        this.playerTwoProgressElement.val(gameModel.players[1].model.health);
    }
}