import { Generator } from '../Map/Generator.js';
import { Config } from '../config/Config.js';
import {Utils} from "../Utils.js";

/**
 * Joudrier Kevin
 * Build a map with the parameters
 **/

export class MapModel {
    static WEAPON_DRAGONSPEAR = 1;

    /**
     * Constructor
     *
     * @param {number} tileSize
     * @param {number} maxTileX
     * @param {number} maxTileY
     * @param {Observer} dropItemObserver
     * @param {EventManager} eventManager
     */
    constructor(tileSize, maxTileX, maxTileY, dropItemObserver, eventManager) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = './ressources/tile_map.png';
        this.tileSize = tileSize;
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;
        this.map = [];
        this.mapCollision = [];
        this.mapEvents = [];
        this.generator = null;
        this.dropItemObserver = dropItemObserver;
        this.eventManager = eventManager;

        // Bind this to the method
        this.dropItemEvent = this.dropItemEvent.bind(this);
        this.eventManager.attach('game.dropItemEvent', this.dropItemEvent, 0)

        this.loadWeapon();
    }

    /**
     * Add generator class
     * @param {Generator} generator 
     **/
    addGenerator(generator) {
        this.generator = generator;
    }

    dropItemEvent(position) {
        this.mapEvents[position.y / 32][position.x / 32] = 0;
    }

    loadWeapon() {
        this.weaponDragonspearSprite = new Image();
        this.weaponDragonspearSprite.src = "../ressources/dragonspear.png";
    }

    /**
     * Build random map
     **/
    build() {
        this.map = this.generator.generatedEmptyMap();
        //this.map = this.generator.generatedWallInMap(10);
        this.map = this.generator.generateStand(20);
        this.mapCollision = this.generator.getCollisionMap();
        this.mapEvents = this.generateEventsMap();

        // add four weapon on the map
        for(let i = 0; i < 4; i++) {
            this.addWeapon();
        }
    }

    /**
     * Detect collision with edge map
     *
     * @param {number} targetX
     * @param {number} targetY
     * @returns {boolean}
     **/
    collideIsEdgeMap(targetX, targetY) {
        return targetX > 0 && targetX / 32 < this.maxTileX && targetY > 0 && targetY / 32 < this.maxTileY;
    }

    collide(targetX, targetY) {
        return this.mapCollision[targetY][targetX];
    }

    generateEventsMap() {
        let mapEvents = [];

        for(let i = 0; i < this.maxTileY; i++) {
            let row = [];
            for(let j = 0; j < this.maxTileX; j++) {
                row.push(0);
            }

            mapEvents.push(row);
        }

        return mapEvents;
    }

    /**
     * Add random weapon on the map
     **/
    addWeapon() {
        let positionX = Utils.randomNumber(0, this.maxTileX);
        let positionY = Utils.randomNumber(0, this.maxTileY);

        // Genere une nouvelle position si il y a collision dans la map
        while(this.collide(positionX, positionY) || this.mapEvents[positionY][positionX] === MapModel.WEAPON_DRAGONSPEAR) {
            positionX = Utils.randomNumber(0, this.maxTileX);
            positionY = Utils.randomNumber(0, this.maxTileY);
        }

        this.mapEvents[positionY][positionX] = MapModel.WEAPON_DRAGONSPEAR;
    }
}