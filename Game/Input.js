export class Input {

    constructor(player, canvas) {
        this.player = player;

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

        canvas.addEventListener('click', (event) => {
            this.player.moveTarget(event.offsetX, event.offsetY);
        })
    }

}