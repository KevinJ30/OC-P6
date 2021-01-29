import { Utils } from '../Utils.js';
import {Config} from "../config/Config.js";

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
                // genere un nombre aleatoire pour ajouter une tuile d'eau ou d'herbe
                let randomWater = Utils.randomNumber(0, 3);
                row.push(Config.GROUND_TILE);
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
    generatedWallInMap(fillPourcentage = 30) {
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

    addStand(number) {
        // Generate aléatoire
        for(let i = 0; i < number; i++) {
            let coordinates = this.generateCoordinates(2);

            while(this.collisionStand(coordinates.x, coordinates.y)) {
                coordinates = this.generateCoordinates(2);
            }

            this.generateStand(coordinates.x, coordinates.y);
        }

        return this.map;
    }

    generateStand(startX, startY) {
        this.map[startY][startX] = Config.STAND_TILES[0];
        this.map[startY][startX + 1] = Config.STAND_TILES[1];
        this.map[startY + 1][startX] = Config.STAND_TILES[2];
        this.map[startY + 1][startX + 1] = Config.STAND_TILES[3];
    }

    collisionStand(startX, startY) {
        if(this.detectCollision(this.map[startY][startX]) || this.detectCollision(this.map[startY][startX + 1])
            || this.detectCollision(this.map[startY + 1][startX]) || this.detectCollision(this.map[startY + 1][startX + 1])
        ){
            return true;
        }

        return false;
    }

    detectCollision(tileNumberDetect) {
        return tileNumberDetect === 14 || tileNumberDetect === 15 || tileNumberDetect === 30 || tileNumberDetect === 31;
    }

    /**
     * Return new coordinates
     * @param {number} offset
     * @returns {{x: number, y: number}} : Vector 2D
     **/
    generateCoordinates(offset = 0) {
        return {
            x : Utils.randomNumber(0, Config.MAP_MAX_X - offset),
            y : Utils.randomNumber(0, Config.MAP_MAX_Y - offset)
        };
    }

    /**
     * Return collition map
     *
     * @returns {Array} mapCollision
     **/
    getCollisionMap() {
        return this.mapCollision;
    }

    addWater(bulk) {
        let coordinates = this.generateCoordinates();
        let limit = bulk / 2;

        // console.log(this.maxTileX - coordinates.x);
        // console.log(this.maxTileY - coordinates.y);

        for(let i = 0; i < limit; i++) {
            for(let j = 0; j < limit; j++) {
                if(this.maxTileX - coordinates.x >= bulk && this.maxTileY - coordinates.y >= bulk) {
                    this.map[coordinates.y + i][coordinates.x + j] = Config.WATER_TILE;
                }
                else if(this.maxTileX - coordinates.x < bulk && this.maxTileY - coordinates.y < bulk){
                    this.map[coordinates.y - i][coordinates.x - j] = Config.WATER_TILE;
                }
                else if(this.maxTileX - coordinates.x >= bulk && this.maxTileY - coordinates.y < bulk){
                    this.map[coordinates.y - i][coordinates.x + j] = Config.WATER_TILE;
                }
                else {
                    this.map[coordinates.y + i][coordinates.x - j] = Config.WATER_TILE;
                }

            }
        }

        return this.map;
    }
}