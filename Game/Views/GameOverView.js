export class GameOverView {

    static CLASS_HIDDEN = 'hidden'

    constructor() {
        this.HUDContainer = $('.HUD__game-over');
        this.HUDContainer.addClass('hidden');
        this.restartButtonElement = this.createRestartButtonElement();

        this.HUDContainer.append(this.restartButtonElement);
    }

    createRestartButtonElement() {
        return $('<button class="btn btn-primary">Relancer une partie</button>')
    }

    toggleDisplay() {
        console.log(this.HUDContainer);
        this.HUDContainer.toggleClass(GameOverView.CLASS_HIDDEN);
    }
}