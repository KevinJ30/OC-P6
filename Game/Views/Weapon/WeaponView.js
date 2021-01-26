export class WeaponView {
    constructor(spriteSheetSrc) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
        this.spriteSelected = 0;
    }

    draw(ctx, sourceX, sourceY, positionX, positionY, scale) {
        console.log(this.spriteSelected)
        if(this.spriteSheet){
            ctx.drawImage(this.spriteSheet, sourceX, sourceY, 64, 64, positionX, positionY, 32 * scale, 32 * scale);
        }
    }
}