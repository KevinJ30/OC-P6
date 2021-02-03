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

        this.HUDContainerInformation = $('<div></div>').addClass('HUD__container-informations').append('<p></p>');
        this.textInformationsElement = this.HUDContainerInformation.children().last();
        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);
        this.HUDContainer.append(this.HUDContainerInformation);
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

    toggleGameScreen() {
        this.gameContainer.toggleClass('hidden');
    }

    update(hudState) {
        this.playerOneNameElement.text(hudState.playerOneName);
        this.playerTwoNameElement.text(hudState.playerTwoName);
        this.textSelectedElement.text(hudState.playerSelectedUsername);

        // Connect value progress bar
        this.playerOneProgressElement.val(hudState.healthPlayerOne);
        this.playerTwoProgressElement.val(hudState.healthPlayerTwo);
        
        if(hudState.gameStart) {
            this.gameContainer.removeClass('hidden');
        } else {
            this.gameContainer.addClass('hidden'); 
        }

        if(hudState.displayInformations) {
            this.HUDContainerInformation.addClass('display');
        }
        else 
        {
            this.HUDContainerInformation.removeClass('display');
        }

        if(hudState.isFight) {
            this.HUDFightContainer.removeClass('hidden');
            this.HUDFightSelectedContainer.removeClass('hidden');
        }
        else {
            this.HUDFightContainer.addClass('hidden');
            this.HUDFightSelectedContainer.addClass('hidden');
        }

        if(hudState.displayGameContainer) {
            this.gameContainer.removeClass('hidden');
        } else {
            this.gameContainer.addClass('hidden');
        }

        if(hudState.playerSelectedNumber === 0) {
            this.HUDContainerPlayerOne.removeClass('notSelected')
            this.HUDContainerPlayerTwo.addClass('notSelected')
        } else {
            this.HUDContainerPlayerOne.addClass('notSelected')
            this.HUDContainerPlayerTwo.removeClass('notSelected')
        }
    }

    drawInformation(message) {
        this.textInformationsElement.text(message);
        this.HUDContainerInformation.css({visibility: 'visible'})
        
        if(this.HUDContainerInformation.hasClass('fadeOut')) {
            this.HUDContainerInformation.removeClass('fadeOut');
        }
        
        this.HUDContainerInformation.addClass('fadeIn');
        
        // Disparition message
        setTimeout(() => {
            this.HUDContainerInformation.removeClass('fadeIn');
            this.HUDContainerInformation.addClass('fadeOut');

            setTimeout(() => {
                this.HUDContainerInformation.css({visibility:'hidden'});
            }, 30);
        }, 2000);
    }
}