export class Armor {

    constructor(spriteSheetSrc) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
        this.initArmorView();
    }

    initArmorView() {
        this.chestArmorView = new Armor('./ressources/chestArmor.png')
        this.legsArmorView = new Armor('./ressources/legsArmor.png')
        this.footArmorView = new Armor('./ressources/footArmor.png')
    }

    draw(ctx, sourceX, sourceY, positionX, positionY) {
        if(this.spriteSheet) {
            ctx.drawImage(this.spriteSheet, sourceX, sourceY, 64, 64, positionX, positionY, 32, 32);
        }
    }
}