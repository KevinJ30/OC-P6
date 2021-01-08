import { Config } from '../config/Config.js';
import {PlayerInit} from "./PlayerInit.js";

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
 * @property {Weapon} weapon
 **/
export class Player extends PlayerInit {
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
        super(dropItemObserver, roundObserver, context, sizeX, sizeY, image, map, position);
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
        //this.ctx.drawImage(this.image, sourceX, sourceY, 64, 64, position.x, position.y, 32, 32);

        this.chest.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.legs.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.foot.draw(this.ctx, sourceX, sourceY, position.x, position.y);

        if(this.weapon) {
            this.weapon.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        }

        this.isDead();
    }
}