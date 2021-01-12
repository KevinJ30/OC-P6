export class Armor {

    constructor() {}

    draw(ctx, sourceX, sourceY, positionX, positionY) {
        ctx.drawImage(this.spritesheet, sourceX, sourceY, 64, 64, positionX, positionY, 32, 32);
    }
}