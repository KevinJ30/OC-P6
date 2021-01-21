export class HUDView {

    constructor() {
        this.gameContainer = $('.game_screen');
        this.HUDContainer = $('.js-HUD');

        this.drawHudFight()

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

        this.HUDGameOverElement = $('.HUD__game-over');
    }

    bindButtonAttack(handler) {
        this.buttonAttackElement.click((event) => {
            event.preventDefault();
            handler();
        })
    }

    bindButtonDefend(handler) {
        this.buttonDefendElement.click((event) => {
            event.preventDefault();
            handler();
        })
    }


    drawHudFight() {
        this.HUDFightContainer = $('<div></div>').addClass('HUD-fight');
        this.HUDFightSelectedContainer = $('<div></div>').addClass('HUD-fight__selected')
        this.buttonAttackElement = $('<button>Attaquer</button>').addClass('HUD-fight__button');
        this.buttonDefendElement = $('<button>Se défendre</button>').addClass('HUD-fight__button');
        this.textSelectedElement = $('<span></span>').addClass('HUD-fight__selected-text');
        this.imgWeaponElement = $('<img />');
        this.imgWeaponElement.attr('src', './ressources/ui-dragonspear.png');

        this.HUDFightSelectedContainer.append(this.textSelectedElement);
        this.HUDFightSelectedContainer.append(this.imgWeaponElement);
        this.HUDFightContainer.append(this.buttonAttackElement);
        this.HUDFightContainer.append(this.buttonDefendElement);

        this.gameContainer.append(this.HUDFightContainer);
        this.gameContainer.append(this.HUDFightSelectedContainer);
    }

    updateDisplay(gameModel) {
        this.playerOneNameElement.text(gameModel.players[0].model.username + ' ' + gameModel.players[0].model.health);
        this.playerTwoNameElement.text(gameModel.players[1].model.username + ' ' + gameModel.players[1].model.health);
        this.textSelectedElement.text(gameModel.getPlayerSelected().model.username);


        // Connect value progress bar
        this.playerOneProgressElement.val(gameModel.players[0].model.health);
        this.playerTwoProgressElement.val(gameModel.players[1].model.health);
    }

    displayGameOver() {
        this.HUDGameOverElement.toggleClass('hidden');
    }
}