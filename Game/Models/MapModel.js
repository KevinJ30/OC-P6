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
     * @param {string} image
     * @param {Object} tileImg 
     * @param {number} tileSize 
     * @param {number} maxTileX 
     * @param {number} maxTileY 
     */
    constructor(context, srcImage, tileSize, maxTileX, maxTileY, dropItemObserver) {
        this.ctx = context;
        this.srcImage = srcImage
        this.tileImg = new Image();
        this.tileImg.src = this.srcImage;
        this.tileSize = tileSize;
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;
        this.map = [];
        this.mapCollision = [];
        this.mapEvents = [];
        this.generator = null;
        this.dropItemObserver = dropItemObserver;

        // Bind this to the method
        this.dropItemSubscribe = this.dropItemSubscribe.bind(this);
        this.dropItemObserver.subscribe(this.dropItemSubscribe);

        this.loadWeapon();
    }

    /**
     * Add generator class
     * @param {Generator} generator 
     **/
    addGenerator(generator) {
        this.generator = generator;
    }

    dropItemSubscribe(position) {
        this.mapEvents[position.y / 32][position.x / 32] = 0;
        console.log('your suppress bourse of item');
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
        this.map = this.generator.generatedWallInMap(10);
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

    /** Getter & Setter **/

     /**
      * @return {string} tileImg : Image object for the tile
      **/
    getTileImg() { return this.tileImg; }

    /**
     * @param {string} tileImg
     **/
    setTileImg(tileImg) { this.tileImg = tileImg; }

    /**
     * @return {number} tileSize : tile size
     **/
    getTileSize() { return this.tileSize; }

    /**
     * @param {number} tileSize : tile size
     **/
    setTileSize(tileSize) { this.tileSize = tileSize; }

    /**
     * @return {number} maxTileX : maximum number of horizontal tiles
     **/
    getMaxTileX() { return this.maxTileX; }

    /** 
     * @param {number} maxTileX : maximum number of horizontal tiles 
     */
    setMaxTileX(maxTileX) { this.maxTileX = maxTileX; }

    /**
     * @return {number} maxTileY : maximum number of vertical tiles
     **/
    getMaxTileY() { return this.maxTileY; }

    /**
     * @param {number} maxTileY : maximum number of vertical tiles
     **/
    setMaxTileY(maxTileY) { this.maxTileY = maxTileY; }
}