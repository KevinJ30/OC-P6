import {Weapon} from "./Weapon.js";

export class DragonspearWeapon extends Weapon {

    constructor() {
        super();

        this.spritesheet = new Image();
        this.spritesheet.src= "../ressources/dragonspear.png";
        this.spriteSelected = 0;

        this.damage = 10;
    }

}