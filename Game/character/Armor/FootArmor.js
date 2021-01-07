import { Armor } from './Armor.js';

export class FootArmor extends Armor {

    constructor() {
        super();

        this.spritesheet = new Image();
        this.spritesheet.src = "../ressources/footArmor.png";
    }
}