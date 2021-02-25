import {Config} from '../config/Config.js';
import {CanvasView} from './CanvasView.js';

/**
 * classe MapView créer par Joudrier Kévin
 * @extends {CanvasView}
 **/
export class MapView extends CanvasView {

    constructor() {
        super();
    }

    /**
     * Ajoute une grile par dessu la map
     * 
     * @return {void}
     **/
    addGridToMap() {
        this.context.beginPath();
        this.context.moveTo(75, 50);
        this.context.lineTo(100, 75);
        this.context.lineTo(100, 25);
        this.context.fill();
    }

    /**
     * Affiche la map sur le canvas
     *
     * @param {CanvasImageSource} spriteSheet : image contenant les sprites
     * @param {Array} map : Tableaux contenant les informations de la map
     * @param {number} maxTileX : largeur maximum de la map en nombre de Tile
     * @param {number} maxTileY : Hauteur maximum de la map en nombre de Tile
     **/
    drawMap(spriteSheet, map, maxTileX, maxTileY) {
        const tileSize = Config.TILE_SIZE;

        for(let i = 0; i < maxTileY; i++) {
            for(let j = 0; j < maxTileX; j++) {
                const positionTile = {
                    x : j * tileSize,
                    y : i * tileSize
                }
                
                // Numéro de la Tile
                let a = map[i][j];
                
                /**
                 * Calcule la position de Tile sur le spritesheet en X et Y
                 **/
                const sourceX = Math.floor(a % Config.MAX_NUMBER_TILESET) * tileSize;
                const sourceY = Math.floor((a / Config.MAX_NUMBER_TILESET)) *  tileSize;
                
                /**
                 * Affiche la Tile sur le canvas
                 **/
                this.draw(spriteSheet, sourceX, sourceY, tileSize, tileSize, positionTile.x, positionTile.y, tileSize, tileSize);
                this.ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
                this.ctx.strokeRect(positionTile.x, positionTile.y, tileSize, tileSize);
            }
        }
    }

    /**
     * Ajoutes les éléments d'événement sur la map (Trésor de guerre)
     *
     * @param {CanvasImageSource} spriteSheet : Image contenant toutes les Tile
     * @param {Array} mapEvents : Tableau contenant le placement des événement sur la map
     * @param {number} maxTileX : largeur maximum de la map en nombre de Tile
     * @param {number} maxTileY : Hauteur maximun de la map en nombre de Tile
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