import {WeaponView} from "./WeaponView.js";

export class DragonspearWeaponView extends WeaponView {

    constructor() {
        super();

        this.spritesheet = new Image();
        this.spritesheet.src= "../ressources/dragonspear.png";
        this.spriteSelected = 0;

        this.damage = 10;
    }

}