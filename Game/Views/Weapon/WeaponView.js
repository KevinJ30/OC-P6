export class WeaponView {
    constructor(spriteSheetSrc) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
    }

    draw(ctx, sourceX, sourceY, positionX, positionY) {
        ctx.drawImage(this.spriteSheet, sourceX, sourceY, 64, 64, positionX, positionY, 32, 32);
    }
}