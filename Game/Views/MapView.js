import {Config} from '../config/Config.js';
import {CanvasView} from './CanvasView.js';

export class MapView extends CanvasView {

    constructor() {
        super();
    }

    addGridToMap() {
        this.context.beginPath();
        this.context.moveTo(75, 50);
        this.context.lineTo(100, 75);
        this.context.lineTo(100, 25);
        this.context.fill();
    }

    /**
     * Draw map
     *
     * @param {CanvasImageSource} spriteSheet
     * @param {CanvasRenderingContext2D} context
     * @param {Array} map
     * @param {number} maxTileY
     * @param {number} maxTileX
     **/
    drawMap(spriteSheet, map, maxTileX, maxTileY) {
        const tileSize = Config.TILE_SIZE;

        for(let i = 0; i < maxTileY; i++) {
            for(let j = 0; j < maxTileX; j++) {
                const positionTile = {
                    x : j * tileSize,
                    y : i * tileSize
                }

                let a = map[i][j];

                const sourceX = Math.floor(a % Config.MAX_NUMBER_TILESET) * tileSize;
                const sourceY = Math.floor((a / Config.MAX_NUMBER_TILESET)) *  tileSize;

                this.draw(spriteSheet, sourceX, sourceY, tileSize, tileSize, positionTile.x, positionTile.y, tileSize, tileSize);
                this.ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
                this.ctx.strokeRect(positionTile.x, positionTile.y, tileSize, tileSize);
            }
        }
    }

    /**
     * Add event element of the map
     *
     * @param {CanvasImageSource} spriteSheet
     * @param {Array} mapEvents
     * @param {number} maxTileX
     * @param {number} maxTileY
     **/
    drawEvents(spriteSheet, mapEvents, maxTileX, maxTileY) {
        const tileSize = Config.TILE_SIZE;

        for(let i = 0; i < maxTileY; i++) {
            for(let j = 0; j < maxTileX; j++) {
                if(mapEvents[i][j] === 1) {
                    const positionTile = {
                        x : j * tileSize,
                        y : i * tileSize
                    }

                    const a = Config.BOX_TILE;
                    const sourceX = Math.floor(a % Config.MAX_NUMBER_TILESET) * tileSize;
                    const sourceY = Math.floor((a / Config.MAX_NUMBER_TILESET)) *  tileSize;

                    this.draw(spriteSheet, sourceX, sourceY, tileSize, tileSize, positionTile.x, positionTile.y, tileSize, tileSize);
                }
            }
        }
    }

}