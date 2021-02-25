/**
 * classe HUDView créer par Joudrier Kevin
 *
 * @property {HTMLElement} gameContainer : Contient tous les éléments HTML du jeu
 * @property {HTMLElement} HUDContainer : Contient tous les éléments HTML du HUD
 * @property {HTMLElement} HUDContainerPlayerOne : Contient tous les éléments HTML du HUD
 * Pour le joueur 1
 * @property {HTMLElement} HUDContainerPlayerTwo : Contient tous les éléments HTML du HUD
 * pour le joueur 2
 * @property {HTMLElement} playerOneNameElement : Elément HTML contenant le nom du joueur 1
 * @property {HTMLElement} playerTwoNameElement : Elément HTML contenant le nom du joueur 2
 * @property {HTMLElement} playerInfoContainerOne : Contient tous les éléments HTML contenant
 * les caractéristiques du joueur 1
 * @property {HTMLElement} playerOneInfoDefendText : Elément contenant les informations de défense
 * @property {HTMLElement} playerOneInfoAttackText : Elément contenant les information d'attaque
 * @property {HTMLElement} playerInfoContainerTwo : Contient tous les éléments HTML contenant
 * les caractéristiques du joueur 2
 * @property {HTMLElement} playerTwoInfoDefendText : Elément contenant les informations de défense
 * @property {HTMLElement} playerTwoInfoAttackText : Elément contenant les informations d'attaque
 * @property {HTMLElement} playerOneProgressElement : Progresse bar contenant la vie du joueur
 * @property {HTMLElement} playerTwoProgressElement : Progress bar contenant la vie du joueur
 * @property {HTMLElement} HUDContainerInformation : Contient les information du HUD
 * @property {HTMLElement} textInformationElement : Elément contenant le texte a affiché pendant la phase de combat
 **/
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

    /**
     * Créer les éléments HTML pour représenter la défense d'un joueur
     * 
     * @return {void}
     **/
    createShieldElement() {
        const shieldIcon = $('<span class="icon-shield></span')
        const shieldText = $('<span class="text-info"></span>')
        
        let container = $('<p class="info info-defend"></p>')
        container.append(shieldIcon);
        container.append(shieldText);

        this.infoplayerOneText = shieldText;

        return container;
    }

    /**
     * Lie l'événement du bouton d'attaque avec le controller
     * 
     * @param {function} handler : fonction d'apelle 
     * @return {void}
     **/
    bindButtonAttack(handler) {
        this.buttonAttackElement.click((event) => {
            event.preventDefault();
            handler();
        })
    }

    /**
     * Lie le bouton de défense avec le controller
     * 
     * @param {function} handler : fonction d'appelle 
     * @return {void}
     **/
    bindButtonDefend(handler) {
        this.buttonDefendElement.click((event) => {
            event.preventDefault();
            handler();
        })
    }

    /**
     * Affiche les éléments du HUD combat
     * 
     * @return {void}
     **/
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

    /**
     * Affiche ou masque la fénêtre de jeu
     * 
     * @return {void}
     **/
    toggleGameScreen() {
        this.gameContainer.toggleClass('hidden');
    }

    /**
     * Met a jour les élément HTML du HUD
     * 
     * @param {Object} hudState
     * @return {void} 
     **/
    update(hudState) {
        // Affihce le nom des joueurs
        this.playerOneNameElement.text(hudState.playerOneName);
        this.playerTwoNameElement.text(hudState.playerTwoName);
        this.textSelectedElement.text(hudState.playerSelectedUsername);

        // Synchronise la valeur de la progress bar avec la vie des joueurs
        this.playerOneProgressElement.val(hudState.healthPlayerOne);
        this.playerTwoProgressElement.val(hudState.healthPlayerTwo);
        
        // Affiche les informations d'attaque
        this.playerOneInfoAttackText.text(hudState.players[0].model.weapon ? hudState.players[0].model.weapon.damage : hudState.players[0].model.damage)
        this.playerTwoInfoAttackText.text(hudState.players[1].model.weapon ? hudState.players[1].model.weapon.damage : hudState.players[1].model.damage)
        
        // Affiche l'icone de defense si le joueur clique sur le bouton se défendre
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

        // Si la partie démarre on affiche le plateau de jeu
        if(hudState.gameStart) {
            this.gameContainer.removeClass('hidden');
        } else {
            this.gameContainer.addClass('hidden'); 
        }

        // Affiche les infmrations
        if(hudState.displayInformations) {
            this.HUDContainerInformation.addClass('display');
        }
        else 
        {
            this.HUDContainerInformation.removeClass('display');
        }

        // Affiche le plateau de combat
        if(hudState.isFight) {
            this.HUDFightContainer.removeClass('hidden');
            this.HUDFightSelectedContainer.removeClass('hidden');
        }
        else {
            this.HUDFightContainer.addClass('hidden');
            this.HUDFightSelectedContainer.addClass('hidden');
        }

        // Affiche le conteneur du jeu
        if(hudState.displayGameContainer) {
            this.gameContainer.removeClass('hidden');
        } else {
            this.gameContainer.addClass('hidden');
        }

        // Affiche le joueur qui est en train de jouer son tour
        if(hudState.playerSelectedNumber === 0) {
            this.HUDContainerPlayerOne.removeClass('notSelected')
            this.HUDContainerPlayerTwo.addClass('notSelected')
        } else {
            this.HUDContainerPlayerOne.addClass('notSelected')
            this.HUDContainerPlayerTwo.removeClass('notSelected')
        }
    }

    /**
     * Affiche un message sur l'ecran de jeu
     * 
     * @param {string} message : message a affiché au millieu de l'écran 
     * @return {void}
     **/
    drawInformation(message, duration = 2000) {
        this.textInformationsElement.text(message);
        this.HUDContainerInformation.css({visibility: 'visible'})
        
        if(this.HUDContainerInformation.hasClass('fadeOut')) {
            this.HUDContainerInformation.removeClass('fadeOut');
        }
        
        this.HUDContainerInformation.addClass('fadeIn');
        
        // Disparition du message
        setTimeout(() => {
            this.HUDContainerInformation.removeClass('fadeIn');
            this.HUDContainerInformation.addClass('fadeOut');

            setTimeout(() => {
                this.HUDContainerInformation.css({visibility:'hidden'});
            }, 30);
        }, duration);
    }
}