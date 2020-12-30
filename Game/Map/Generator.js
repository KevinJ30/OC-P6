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
        this.mapCollision = [];
    }

    generatedEmptyMap() {
        // créer un map vide
        for(let i = 0; i < this.maxTileY; i++) {
            let row = [];
            let colsCollision = [];

            for(let j = 0; j < this.maxTileX; j++) {
                row.push(this.BLANK_TILE);
                colsCollision.push(0);
            }
            this.map.push(row);
            this.mapCollision.push(colsCollision);
        }

        return this.map;
    }

    generatedWallInMap(fillPourcentage) {
        fillPourcentage = fillPourcentage === undefined ? 0 : fillPourcentage;
        let wallNumber = (this.maxTileY * this.maxTileX) * fillPourcentage / 100;
        let wallPosition = [];
        for(let i = 0; i < wallNumber; i++) {
            let randomX = Utils.randomNumber(0, this.maxTileX);
            let randomY = Utils.randomNumber(0, this.maxTileY);
            
            // if exists wall in the case then change random number
            while(this.map[randomY][randomX] === 32) {
                randomX = Utils.randomNumber(0, this.maxTileX);
                randomY = Utils.randomNumber(0, this.maxTileY);
            }
            

            this.map[randomY][randomX] = this.WALL_TILE;
            wallPosition.push({x: randomX, y: randomY});
            this.mapCollision[randomY][randomX] = 1;
        }

        return this.map;
    }

    getCollisionMap() {
        return this.mapCollision;
    }
}