export class GameOverView {

    static CLASS_HIDDEN = 'hidden'

    constructor() {
        this.HUDContainer = $('.HUD__game-over');
        this.HUDContainer.addClass('hidden');
        this.usernameElement = $('.js-usernameElement');
        this.restartButtonElement = this.createRestartButtonElement();

        this.HUDContainer.append(this.restartButtonElement);
    }

    createRestartButtonElement() {
        return $('<button class="btn btn-primary">Relancer une partie</button>')
    }

    toggleDisplay() {
        this.HUDContainer.toggleClass(GameOverView.CLASS_HIDDEN);
    }

    bindButtonRestart(handler) {
        this.restartButtonElement.click((event) => {
            event.preventDefault();
            handler();
        })
    }

    updateUsername(playerDead) {
        this.usernameElement.text(playerDead);
    }
}