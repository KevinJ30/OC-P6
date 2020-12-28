import { Utils } from '../Utils.js';

export class Generator {
    static map = [];

    static maxTileX;

    static maxTileY;

    static BLANK_TILE;

    static WALL_TILE;

    constructor(maxTileX, maxTileY, blankTileNumber, wallTileNumber) {
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;

        this.BLANK_TILE = blankTileNumber;
        this.WALL_TILE = wallTileNumber;
        this.map = [];
    }

    generatedEmptyMap() {
        // créer un map vide
        for(let i = 0; i < this.maxTileY; i++) {
            let row = [];

            for(let j = 0; j < this.maxTileX; j++) {
                row.push(this.BLANK_TILE);
            }
            
            this.map.push(row);
        }

        return this.map;
    }

    generatedWallInMap() {
        let wallNumber = 30;
        
        for(let i = 0; i < wallNumber; i++) {
            let randomX = Utils.randomNumber(0, this.maxTileX)
            let randomY = Utils.randomNumber(0, this.maxTileY)
            this.map[randomY][randomX] = this.WALL_TILE;
        }

        return this.map;
    }
}