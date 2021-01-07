import { Armor } from './Armor.js';

export class LegsArmor extends Armor {

    constructor() {
        super();

        this.spritesheet = new Image();
        this.spritesheet.src = "../ressources/legsArmor.png";
    }
}