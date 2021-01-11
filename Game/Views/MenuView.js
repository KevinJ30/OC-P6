export class MenuView {

    constructor() {
        this.btnStart = $('.js-btn-start');
        this.menu = $('#menu_game');
    }

    bindButtonStartGame(handler) {
        this.btnStart.click((event) => {
            handler();
        })
    }

    displayMenu() {
        this.menu.toggleClass('hidden');
    }
}