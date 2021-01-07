export class Input {

    constructor(gameStore, player, canvas, map) {
        this.player = player;
        this.map = map;
        this.canvas = canvas;

        console.log(gameStore);
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
            this.player.moveTarget(event.offsetX, event.offsetY);
        })
    }

}