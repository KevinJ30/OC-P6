export class Player {

    constructor (sizeX, sizeY, image) {
        this.image = image;
        console.log(this.image)
        
        this.size = {
            x: sizeX,
            y: sizeY
        }

        this.position = {
            x: 0,
            y: 0
        }
    }

    animate(context) {
        context.drawImage(this.image, 0, 0, 64, 64, 0, 0, 32, 32);
    }

}