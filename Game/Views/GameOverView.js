export class GameOverView {

    static CLASS_HIDDEN = 'hidden'

    constructor() {
        this.HUDContainer = $('.HUD__game-over');
        this.HUDContainer.addClass('hidden');
    }

    toggleDisplay() {
        console.log(this.HUDContainer);
        this.HUDContainer.toggleClass(GameOverView.CLASS_HIDDEN);
    }
}