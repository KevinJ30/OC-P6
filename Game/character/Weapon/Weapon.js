export class Weapon {

    constructor() {
        this.spritesheet = null;
        this.spriteSelected = 0;
        this.damage = 5;
    }

    draw(ctx, sourceX, sourceY, positionX, positionY) {
        ctx.drawImage(this.spritesheet, sourceX, sourceY, 64, 64, positionX, positionY, 32, 32);
    }
}