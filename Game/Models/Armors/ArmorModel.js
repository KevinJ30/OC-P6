/**
 * Class ArmorModel
 *
 * @property { number } armor
 **/
export class ArmorModel {

    /**
     * @param {number} armor
     **/
    constructor(armor, spriteSheetSrc) {
        this.armor = armor;
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
    }

}