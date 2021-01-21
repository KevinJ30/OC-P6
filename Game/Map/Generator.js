import { Utils } from '../Utils.js';

/**
 * Created by Joudrier Kevin
 **/
export class Generator {
    /**
     * Constructor.
     *
     * @param maxTileX
     * @param maxTileY
     * @param blankTileNumber
     * @param wallTileNumber
     **/
    constructor(maxTileX, maxTileY, blankTileNumber, wallTileNumber) {
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;

        this.BLANK_TILE = blankTileNumber;
        this.WALL_TILE = wallTileNumber;

        this.map = [];
        this.mapCollision = [];
    }

    /**
     * 
     * @param {number} humanDrunkerMax 
     **/
    generatePath(humanDrunkerMax) {
        const startDrunkX = Utils.randomNumber(0, this.maxTileX);
        const startDrunkY = Utils.randomNumber(0, this.maxTileY);
        const drunkLifeDuration = Utils.randomNumber(0, this.maxTileX * this.maxTileY);
        let currentPositionDrunkX = startDrunkX;
        let currentPositionDrunkY = startDrunkY;
        let currentDirectionDrunk = 0;

        console.log(startDrunkX, startDrunkY);

        for(let i = 0; i < drunkLifeDuration; i++) {
            this.map[currentPositionDrunkY][currentPositionDrunkX] = 17;
            
            if(currentDirectionDrunk === 0) {
                let newPosition = currentPositionDrunkX + 1;
                
                if(newPosition <= this.maxTileX - 1) {
                    currentPositionDrunkX = newPosition;
                }
                else {
                    currentDirectionDrunk = 1;
                }
            }

            if(currentDirectionDrunk === 1){
                let newPosition = currentPositionDrunkY + 1;
                console.log(currentPositionDrunkX);
                if(newPosition <= this.maxTileY - 1){
                    currentPositionDrunkY = newPosition;
                }
            }
        }

        return this.map;
    }

    /**
     * Generate empty map
     *
     * @returns {Array} map
     **/
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

    /**
     * Generate wall map
     *
     * @param {number} fillPourcentage : pourcent wall generate
     * @returns {Array} map
     **/
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

    /**
     * Return collition map
     *
     * @returns {Array} mapCollision
     **/
    getCollisionMap() {
        return this.mapCollision;
    }
}