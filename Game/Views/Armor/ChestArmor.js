import { Armor } from './Armor.js';

export class ChestArmor extends Armor {

    constructor() {
        super();

        this.spritesheet = new Image();
        this.spritesheet.src = "./ressources/chestArmor.png";
    }
}