import {PlayerSprite} from "../Models/PlayerModel.js";
import {ChestArmor} from "./Armor/ChestArmor.js";
import {LegsArmor} from "./Armor/LegsArmor.js";
import {FootArmor} from "./Armor/FootArmor.js";
import {PlayerControl} from "./character/PlayerControl.js";

export class PlayerInit extends PlayerControl {

    /**
     * Constructor.
     *
     * @param dropItemObserver
     * @param roundObserver
     * @param {CanvasRenderingContext2D} context
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {HTMLImageElement} image
     * @param {Object} map
     * @param {x, y, numberTile} position
     **/
    constructor (dropItemObserver, roundObserver, context, sizeX, sizeY, image, map, position) {
        super();

        this.ctx = context;
        this.image = image;
        this.map = map;
        this.selectedPlayer = true;
        this.size = { x: sizeX, y: sizeY };
        this.position = position;
        this.health = 100;
        this.velocity = 4; // Valeur divisible par 32
        this.playerDirection = PlayerSprite.LEFT;
        this.chest = new ChestArmor();
        this.legs = new LegsArmor();
        this.foot = new FootArmor();
        this.weapon = null;
        this.roundObserver = roundObserver;
        this.dropItemObserver = dropItemObserver;
        this.damage = 5;
    }
}