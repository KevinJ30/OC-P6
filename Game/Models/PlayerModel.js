import { Config } from '../config/Config.js';
import {ArmorModel} from "./Armors/ArmorModel.js";
import {WeaponModel} from "./WeaponModel.js";

export class PlayerSprite {
    static LEFT = 9;
    static RIGHT = 27;
    static UP = 0;
    static DOWN = 18;
}

/**
 * @property {CanvasRenderingContext2D} ctx
 * @property {HTMLImageElement} image
 * @property {Map} map
 * @property {boolean} selectedPlayer
 * @property {number} size
 * @property {Object} position
 * @property {number} health
 * @property {number} velocity
 * @property {number} playerDirection
 * @property {Armor} chest
 * @property {Armor} legs
 * @property {Armor} foot
 * @property {WeaponView} weapon
 **/
export class PlayerModel {
    /**
     * Constructor.
     *
     * @param {EventManager} eventManager
     * @param {Observer} receiveDamageObserver
     * @param {Observer} dropItemObserver
     * @param {Observer} roundObserver
     * @param {CanvasRenderingContext2D} context
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {HTMLImageElement} image
     * @param {MapModel} mapModel
     * @param {x, y, numberTile} position
     **/
    constructor (eventManager, receiveDamageObserver, context, sizeX, sizeY, image, mapModel, position) {
        this.ctx = context;
        this.spriteSheet = image;
        this.mapModel = mapModel;
        this.selectedPlayer = true;
        this.size = { x: sizeX, y: sizeY };
        this.position = position;
        this.health = 100;
        this.velocity = 4;
        this.playerDirection = PlayerSprite.LEFT;
        this.chest = null;
        this.legs = null;
        this.foot = null;
        this.weapon = null;
        this.damage = 5;
        this.username = "No Player Name"
        this.defend = false;
        this.eventManager = eventManager;

        /**
        /**
         * Observer
         * @type {Observer}
         **/
        this.receiveDamageObserver = receiveDamageObserver;
    }

    /**
     *
     * @param {WeaponModel} weapon
     **/
    setWeapon(weapon) {
        this.weapon = weapon;
    }

    /**
     * Name of the player game
     * 
     * @param {string} username 
     **/
    setName(username) {
        this.username = username;
    }

    /**
     * Receive damage when is attacked
     * @param {number} quantity
     **/
    receiveDamage(quantity) {
        this.health -= !this.defend ? quantity : quantity / 2;

        // Notifier la vue pour animer le personnage
        this.receiveDamageObserver.notify(this);

       if(this.health <= 0) {
            this.health = 0;
        }
    }

    getDamage() {
        if(this.weapon) {
            return this.weapon.damage;
        }

        return this.damage;
    }

    isDead() {
        return this.health <= 0;
    }

    /**
     * Player Control
     **/
    /**
     * Mouse player with mosue
     *
     * @param {number} targetX  : target mouse click in x
     * @param {number} targetY  : target mosue click in y
     **/
    moveTarget(targetX, targetY) {
        /**
         * calculated number case of the array map
         **/
        const caseNumberX = Math.trunc(targetX / 32);
        const caseNumberY = Math.trunc(targetY / 32);

        /**
         * Calculate the position difference
         **/
        const diffPositionX = caseNumberX - this.position.x / Config.TILE_SIZE;
        const diffPositionY = caseNumberY - this.position.y / Config.TILE_SIZE;

        /**
         * Detect the collision and maximum number of case movement
         **/

        // Map end collision
        if(Math.abs(diffPositionX) <= 3 && Math.abs(diffPositionY) <= 3) {
            if(Math.abs(diffPositionX) !== 0 && Math.abs(diffPositionY) === 0 || Math.abs(diffPositionY) !== 0 && Math.abs(diffPositionX) === 0) {

                // Collision with wall map
                if(!this.mapModel.collide(caseNumberX, caseNumberY)) {

                    /**
                     * Determined direction movement player
                     **/

                    // Movement left Player
                    if(diffPositionX !== 0 && diffPositionY === 0 && diffPositionX < 0) {
                        this.moveLeft(this.position.x + diffPositionX * 32);

                    }
                    else if(diffPositionX !== 0 && diffPositionY === 0 && diffPositionX > 0) {
                        this.moveRight(this.position.x + diffPositionX * 32);
                    }
                    else if(diffPositionY !== 0 && diffPositionX === 0 && diffPositionY < 0) {
                        this.moveUp(this.position.y + diffPositionY * 32);
                    }
                    else if(diffPositionY !== 0 && diffPositionX === 0 && diffPositionY > 0) {
                        this.moveDown(this.position.y + diffPositionY * 32);
                    }
                }
                else {
                    alert('Je ne peux pas me déplacer ici !');
                }
            }
            else {
                // Envoyer une message sur le jeu
                alert('Je ne peux pas me déplacer ici !');
            }
        }
        else {
            alert('Je ne peux pas me déplacer ici !');
        }
    }

    dropItem() {
        if(this.mapModel.mapEvents[this.position.y / 32][this.position.x / 32]) {
            this.weapon = new WeaponModel(10);
            this.eventManager.trigger('game.dropItemEvent', null, [this.position]);
        }
    }

    /**
     * Move left player
     * @return void
     */
    moveLeft(newPosition) {
        this.playerDirection = PlayerSprite.LEFT;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.LEFT;
                this.position.x -= this.velocity;
                i++;
            }
            else {
                this.dropItem();

                this.playerDirection = PlayerSprite.LEFT;
                //this.roundObserver.notify()
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16);
    }

    /**
     * Move right player
     * @return void
     **/
    moveRight(newPosition) {
        this.playerDirection = PlayerSprite.RIGHT;

        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.RIGHT;
                this.position.x += this.velocity;
                i++;
            }
            else{
                this.dropItem();
                this.playerDirection = PlayerSprite.RIGHT;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16)
    }

    /**
     * Move up player
     * @return void
     **/
    moveUp(newPosition) {
        this.playerDirection = PlayerSprite.UP;

        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.UP;
                this.position.y -= this.velocity;
                i++;
            }
            else {
                this.dropItem();
                this.playerDirection = PlayerSprite.UP;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16);

    }

    /**
     * Move down player
     * @return void
     **/
    moveDown(newPosition) {
        this.playerDirection = PlayerSprite.DOWN;
        let i = 0;

        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                // Calculated playerDirection sprite
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.DOWN;
                this.position.y += this.velocity;
                i++;
            }
            else {
                this.dropItem();
                this.playerDirection = PlayerSprite.DOWN;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16);
    }
}