import {Config} from "../config/Config.js";

export class MapView {

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {string} spriteSheetSrc
     **/
    constructor(context, spriteSheetSrc) {
        this.ctx = context;
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
    }

    addGridToMap() {
        this.ctx.beginPath();
        this.ctx.moveTo(75, 50);
        this.ctx.lineTo(100, 75);
        this.ctx.lineTo(100, 25);
        this.ctx.fill();
    }

    /**
     * Draw map
     *
     * @param {Array} map
     * @param {number} maxTileY
     * @param {number} maxTileX
     **/
    draw(map, maxTileX, maxTileY) {
        const tileSize = Config.TILE_SIZE;

        for(let i = 0; i < maxTileY; i++) {
            for(let j = 0; j < maxTileX; j++) {
                const positionTile = {
                    x : j * tileSize,
                    y : i * tileSize
                }

                let a = map[i][j];

                const sourceX = Math.floor(a % 16) * tileSize;
                const sourceY = Math.floor((a / 16)) *  tileSize;

                this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, tileSize, tileSize, positionTile.x, positionTile.y, tileSize, tileSize);
                //this.ctx.drawImage(this.tileImg, sourceX, sourceY, this.tileSize, this.tileSize, positionTile.x, positionTile.y, 64, 64);
                this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
                this.ctx.strokeRect(positionTile.x, positionTile.y, tileSize, tileSize);
                //this.ctx.strokeRect(positionTile.x, positionTile.y, 64, 64);
            }
        }
    }

    drawEvents(mapEvents, maxTileX, maxTileY) {
        const tileSize = Config.TILE_SIZE;

        for(let i = 0; i < maxTileY; i++) {
            for(let j = 0; j < maxTileX; j++) {
                if(mapEvents[i][j] === 1) {
                    const positionTile = {
                        x : j * tileSize,
                        y : i * tileSize
                    }

                    const a = 168;
                    const sourceX = Math.floor(a % 16) * tileSize;
                    const sourceY = Math.floor((a / 16)) *  tileSize;

                    this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, tileSize, tileSize, positionTile.x, positionTile.y, tileSize, tileSize);
                    /**this.ctx.drawImage(this.tileImg, 0, 0, 64, 64, 0, 0, 32, 32)**/
                }
            }
        }
    }

}