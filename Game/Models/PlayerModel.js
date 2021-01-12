import { Config } from '../config/Config.js';
import {ChestArmor} from "../Views/Armor/ChestArmor.js";
import {LegsArmor} from "../Views/Armor/LegsArmor.js";
import {FootArmor} from "../Views/Armor/FootArmor.js";
import {DragonspearWeaponView} from "../Views/Weapon/DragonspearWeaponView.js";

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

    /**
     * Name of the player game
     * 
     * @param {string} username 
     **/
    setName(username) {
        this.username = username;
    }

    /**
     * Add case to the grid highlight the player selected
     *
     * @param {number} positionGrid
     * @param {boolean} vertical
     **/
    addCaseToGrid(positionGrid, vertical) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(vertical ? positionGrid : this.position.x, !vertical ? positionGrid : this.position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.ctx.strokeRect(vertical ? positionGrid : this.position.x, !vertical ? positionGrid : this.position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.ctx.fill();
    }

    /**
     * Add Grid highlight to the player
     *
     * @return void
     **/
    addGridToPlayer() {
        // Add grid to the right player
        for(let i = 0; i < 3; i++) {
            let positionGrid = this.position.x + Config.TILE_SIZE * (i + 1);

            if(this.map.collideIsEdgeMap(this.position.x + Config.TILE_SIZE, this.position.y)) {
                if (!this.map.collide(Math.floor(positionGrid / 32), Math.floor(this.position.y / 32))) {
                    this.addCaseToGrid(positionGrid, true);
                } else {
                    break;
                }
            }
            else {
                break;
            }
        }

        // Add grid to the left player
        for(let i = 0; i < 3; i++) {
            let positionGrid = this.position.x - Config.TILE_SIZE * (i + 1);

            if(this.position.x > 0 && this.position.x / 32 + 1 < Config.MAP_MAX_X && this.position.y > 0 && (this.position.y / 32) < Config.MAP_MAX_Y) {
                if (!this.map.collide(Math.floor(positionGrid / 32), Math.floor(this.position.y / 32))) {
                    this.addCaseToGrid(positionGrid, true);
                } else {
                    break;
                }
            }
            else {
                break;
            }
        }

        // Add grid to the up player
        for(let i = 0; i < 3; i++) {
            let positionGrid = (this.position.y + Config.TILE_SIZE * (i + 1));

            if(this.position.y > 0 && positionGrid / 32 < Config.MAP_MAX_Y && this.position.x > 0 && (this.position.x / 32) < Config.MAP_MAX_X) {
                if (!this.map.collide(Math.floor(this.position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(positionGrid, false);
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        for(let i = 0; i < 3; i++) {
            let positionGrid = (this.position.y  - Config.TILE_SIZE * (i + 1));

            if(positionGrid > (0 - 1) && this.position.y / 32 < Config.MAP_MAX_Y && this.position.x > 0 && (this.position.x / 32) < Config.MAP_MAX_X) {
                if (!this.map.collide(Math.floor(this.position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(positionGrid, false);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    /**
     * the method is called when the fight begins
     **/
    /**enterFight() {
        console.log(111);
    }**/

    /**
     * Receive damage when is attacked
     * @param {number} quantity
     **/
    receiveDamage(quantity) {
        this.health -= quantity;

        if(this.health < 0) {
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
        if(this.health <= 0) {
            return true;
        }

        return false;
    }

    /**
     * Update player
     * @param {Object} position
     **/
    update(position) {
        // selected tile with tileset
        const numberTile = this.playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        this.ctx.drawImage(this.image, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE, Config.TILE_SIZE);

        this.chest.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.legs.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.foot.draw(this.ctx, sourceX, sourceY, position.x, position.y);

        if(this.weapon) {
            this.weapon.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        }

        this.isDead();
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
                if(!this.map.collide(caseNumberX, caseNumberY)) {

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
                this.roundObserver.notify()
                clearInterval(animate);
            }
        }, 16);
    }

    dropItem() {
        if(this.map.mapEvents[this.position.y / 32][this.position.x / 32]) {
            this.weapon = new DragonspearWeaponView();
            this.dropItemObserver.notify(this.position);
        }
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
                this.roundObserver.notify()
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
                this.roundObserver.notify()
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
                this.roundObserver.notify()
                clearInterval(animate);
            }
        }, 16);
    }
}