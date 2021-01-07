import { Generator } from './Generator.js';
import { Config } from '../config/Config.js';
 

/**
 * Joudrier Kevin
 * Build a map with the parameters
 **/
export class Map {

    /**
     * Constructor
     * 
     * @param {string} image
     * @param {Object} tileImg 
     * @param {number} tileSize 
     * @param {number} maxTileX 
     * @param {number} maxTileY 
     */
    constructor(context, srcImage, tileSize, maxTileX, maxTileY) {
        this.ctx = context;
        this.srcImage = srcImage
        this.tileImg = new Image();
        this.tileImg.src = this.srcImage;
        this.tileSize = tileSize;
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;
        this.map = [];
        this.mapCollision = [];
        this.generator = new Generator(Config.MAP_MAX_X, Config.MAP_MAX_Y, Config.BLANK_TILE, Config.WALL_TILE);
    }

    /**
     * Build random map
     **/
    build() {
        this.map = this.generator.generatedEmptyMap();
        this.map = this.generator.generatedWallInMap(10);
        this.mapCollision = this.generator.getCollisionMap();
    }

    /**
     * Draw map
     * 
     * @param { CanvasRenderingContext2D } : Context d'affichage
     **/
    drawMap() {
        for(let i = 0; i < this.maxTileY; i++) {
            for(let j = 0; j < this.maxTileX; j++) {
                const positionTile = {
                    x : j * this.tileSize,
                    y : i * this.tileSize
                }
                
                let a = this.map[i][j];
                 
                const sourceX = Math.floor(a % 16) * this.tileSize;
                const sourceY = Math.floor((a / 16)) *  this.tileSize;
                
                this.ctx.drawImage(this.tileImg, sourceX, sourceY, this.tileSize, this.tileSize, positionTile.x, positionTile.y, this.tileSize, this.tileSize);
                //this.ctx.drawImage(this.tileImg, sourceX, sourceY, this.tileSize, this.tileSize, positionTile.x, positionTile.y, 64, 64);
                this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
                this.ctx.strokeRect(positionTile.x, positionTile.y, this.tileSize, this.tileSize);
                //this.ctx.strokeRect(positionTile.x, positionTile.y, 64, 64);
            }
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

    addGridToMap() {
        this.ctx.beginPath();
        this.ctx.moveTo(75, 50);
        this.ctx.lineTo(100, 75);
        this.ctx.lineTo(100, 25);
        this.ctx.fill();
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