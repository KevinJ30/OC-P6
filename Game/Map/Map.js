/**
 * Joudrier Kevin
 * Build a map with the parameters
 **/
export class Map {

    /**
     * @param {Array} map : data of the generated map
     **/
    static map;

    /**
     * @param {string} srcImage : src tile image
     **/
    static srcImage;

    /**
     * @param {string} tileImg : Image object for the tile
     **/
    static tileImg;

    /**
     * @param {number} tileSize : tile size
     **/
    static tileSize;

    /**
     * @param {number} maxTileX : maximum number of horizontal tiles
     **/
    static maxTileX;

    /**
     * @param {number} maxTileY : maximum number of vertical tiles
     **/
    static maxTileY;

    /**
     * Constructor
     * 
     * @param {string} image
     * @param {Object} tileImg 
     * @param {number} tileSize 
     * @param {number} maxTileX 
     * @param {number} maxTileY 
     */
    constructor(srcImage, tileSize, maxTileX, maxTileY) {
        this.srcImage = srcImage
        
        this.tileImg = new Image();
        this.tileImg.src = this.srcImage;

        this.tileSize = tileSize;
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;
        this.map = [];
    }

    /**
     * Build random map
     **/
    generated() {
        // créer un map vide
        for(let i = 0; i < this.maxTileY; i++) {
            let row = [];

            for(let j = 0; j < this.maxTileX; j++) {
                row.push(18);
            }

            this.map.push(row);
        }
    }

    /**
     * Draw map
     * 
     * @param { CanvasRenderingContext2D } : Context d'affichage
     **/
    drawMap(context) {
        for(let i = 0; i < this.maxTileY; i++) {
            for(let j = 0; j < this.maxTileX; j++) {
                const positionTile = {
                    x : j * this.tileSize,
                    y : i * this.tileSize
                }

                const sourceX = Math.floor((18 - 1) % 16) * this.tileSize;
                const sourceY = Math.floor(18 / 16) *  this.tileSize;
                
                context.drawImage(this.tileImg, sourceX, sourceY, this.tileSize, this.tileSize, positionTile.x, positionTile.y, this.tileSize, this.tileSize);
            }
        }
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