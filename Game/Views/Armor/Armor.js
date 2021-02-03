export class Armor {

    constructor(spriteSheetSrc) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
    }

    draw(ctx, sourceX, sourceY, positionX, positionY) {
        if(this.spriteSheet) {
            ctx.drawImage(this.spriteSheet, sourceX, sourceY, 64, 64, positionX, positionY, 32, 32);
        }
    }
}