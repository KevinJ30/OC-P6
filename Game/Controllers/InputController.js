export class InputController {

    constructor(gameStore, canvas) {
        this.canvas = canvas;
        this.gameStore = gameStore;
    }

    init() {
        // Initialisation of the inputs
        window.addEventListener('keydown', (event) => {
            switch(event.key) {
                case "ArrowRight":
                    this.player.move('right');
                    break;

                case "ArrowLeft":
                    this.player.move('left');
                    break;

                case "ArrowUp":
                    this.player.move('up');
                    break;

                case "ArrowDown":
                    this.player.move('down');
                    break;
            }
        })

        this.canvas.addEventListener('click', (event) => {
            let player = this.gameStore.getState().players[this.gameStore.getState().playerSelected];
            player.moveTarget(event.offsetX, event.offsetY);
        })
    }
}