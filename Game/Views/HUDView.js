export class HUDView {

    constructor() {
        this.gameContainer = $('.game_screen');
        this.HUDContainer = $('.js-HUD');

        this.drawHudFight()

        this.HUDContainerPlayerOne = $('.js-player-hud-1');
        this.HUDContainerPlayerTwo = $('.js-player-hud-2');
        this.playerOneNameElement = $('.js-player1-name');
        this.playerTwoNameElement = $('.js-player2-name');

        this.playerInfoContainerOne = $('.player1__info');
        this.playerOneInfoDefendText = this.playerInfoContainerOne.find('.info-defend hidden .text-info-player');
        this.playerOneInfoAttackText = this.playerInfoContainerOne.find('.info-attack .text-info-player');
        this.playerOneInfoAttackText.text(0)

        this.playerInfoContainerTwo = $('.player2__info');
        this.playerTwoInfoDefendText = this.playerInfoContainerTwo.find('.info-defend .text-info-player');
        this.playerTwoInfoAttackText = this.playerInfoContainerTwo.find('.info-attack .text-info-player');
        this.playerTwoInfoDefendText.text(0)


        this.HUDContainerPlayerOne.append('<progress class="health-bar js-hud__health-player1" value="0" max="100"></progress>')
        this.HUDContainerPlayerTwo.append('<progress class="health-bar js-hud__health-player1" value="0" max="100"></progress>')

        this.playerOneProgressElement = this.HUDContainerPlayerOne.children().last();
        this.playerTwoProgressElement = this.HUDContainerPlayerTwo.children().last();

        this.HUDContainerInformation = $('<div></div>').addClass('HUD__container-informations').append('<p></p>');
        this.textInformationsElement = this.HUDContainerInformation.children().last();
        this.HUDContainer.append(this.HUDContainerPlayerOne);
        this.HUDContainer.append(this.HUDContainerPlayerTwo);
        this.HUDContainer.append(this.HUDContainerInformation);

        this.createShieldElement();
    }

    createShieldElement() {
        const shieldIcon = $('<span class="icon-shield></span')
        const shieldText = $('<span class="text-info"></span>')
        
        let container = $('<p class="info info-defend"></p>')
        container.append(shieldIcon);
        container.append(shieldText);

        this.infoplayerOneText = shieldText;

        return container;
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
        
        this.playerOneInfoAttackText.text(hudState.players[0].model.weapon ? hudState.players[0].model.weapon.damage : hudState.players[0].model.damage)
        this.playerTwoInfoAttackText.text(hudState.players[1].model.weapon ? hudState.players[1].model.weapon.damage : hudState.players[1].model.damage)
        
        if(hudState.players[0].model.defend) {
            $('.player1__info .info-defend').removeClass('hidden');
        } else {
            $('.player1__info .info-defend').addClass('hidden');
        }

        if(hudState.players[1].model.defend) {
            $('.player2__info .info-defend').removeClass('hidden');
        } else {
            $('.player2__info .info-defend').addClass('hidden');
        }


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