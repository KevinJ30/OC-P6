import { Config } from '../config/Config.js';
import { Utils } from '../Utils.js';

export class Player {

    /**
     * Constructor.
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {Image} image
     * @param {Map} map
     **/
    constructor (context, sizeX, sizeY, image, map) {
        this.ctx = context;
        this.image = image;
        this.map = map;

        this.selectedPlayer = true;

        this.size = {
            x: sizeX,
            y: sizeY
        }

        const positionPlayer = this.generatePosition();

        this.position = {
            x: positionPlayer.x,
            y: positionPlayer.y
        }

        /**
         * player feature
         **/
        this.health = 100;
    }

    /**
     * Generate random position for the player
     *
     * @returns {{x: number, y: number}}
     **/
    generatePosition() {
        // Generate coordinate for the player
        let randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
        let randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);

        while(this.map.collide(randomX, randomY)){
            randomX = Utils.randomNumber(0, Config.MAP_MAX_X);
            randomY = Utils.randomNumber(0, Config.MAP_MAX_Y);
        }

        return {
            x: randomX * 32,
            y:randomY * 32
        };
    }

    /**
     * Animate the movement player
     **/
    animate() {
        this.update(this.position)
        this.addGridToPlayer();
    }

    /**
     * Add case to the grid highlight the player selected
     *
     * @param {number} positionGrid
     * @param {boolean} vertical
     **/
    addCaseToGrid(positionGrid, vertical) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(vertical ? positionGrid : this.position.x, !vertical ? positionGrid : this.position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.ctx.strokeRect(vertical ? positionGrid : this.position.x, !vertical ? positionGrid : this.position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.ctx.fill();
    }

    /**
     * Add Grid highlight to the player
     *
     * @return void
     **/
    addGridToPlayer() {
        // Add grid to the right player
        for(let i = 0; i < 3; i++) {
            let positionGrid = this.position.x + Config.TILE_SIZE * (i + 1);

            if(this.map.collideIsEdgeMap(this.position.x + Config.TILE_SIZE, this.position.y)) {
                if (!this.map.collide(positionGrid / 32, this.position.y / 32)) {
                    this.addCaseToGrid(positionGrid, true);
                } else {
                    break;
                }
            }
            else {
                break;
            }
        }

        // Add grid to the left player
        for(let i = 0; i < 3; i++) {
            let positionGrid = this.position.x - Config.TILE_SIZE * (i + 1);

            if(this.position.x > 0 && this.position.x / 32 + 1 < Config.MAP_MAX_X && this.position.y > 0 && (this.position.y / 32) < Config.MAP_MAX_Y) {
                if (!this.map.collide(positionGrid / 32, this.position.y / 32)) {
                    this.addCaseToGrid(positionGrid, true);
                } else {
                    break;
                }
            }
            else {
                break;
            }
        }

        // Add grid to the up player
        for(let i = 0; i < 3; i++) {
            let positionGrid = (this.position.y + Config.TILE_SIZE * (i + 1));

            if(this.position.y > 0 && positionGrid / 32 < Config.MAP_MAX_Y && this.position.x > 0 && (this.position.x / 32) < Config.MAP_MAX_X) {
                if (!this.map.collide(this.position.x / 32, positionGrid / 32)) {
                    this.addCaseToGrid(positionGrid, false);
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        for(let i = 0; i < 3; i++) {
            let positionGrid = (this.position.y  - Config.TILE_SIZE * (i + 1));

            if(positionGrid > (0 - 1) && this.position.y / 32 < Config.MAP_MAX_Y && this.position.x > 0 && (this.position.x / 32) < Config.MAP_MAX_X) {
                if (!this.map.collide(this.position.x / 32, positionGrid / 32)) {
                    this.addCaseToGrid(positionGrid, false);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    /**
     * Move player with keyboard
     *
     * @param direction
     **/
    move(direction) {
        /**
         * Calculate the dimmension of the map
         **/
        const map2D = {
            x: Config.MAP_MAX_X * 32,
            y: Config.MAP_MAX_Y * 32
        }

        switch(direction) {
            case 'left':
                if(this.position.x > 0) {
                    this.position.x -= 32;
                }
                break;

            case 'right':
                if((this.position.x + Config.TILE_SIZE) < map2D.x){
                    this.position.x += 32;
                }
                break;

            case 'up':
                if(this.position.y > 0){
                    this.position.y -= 32;
                }
                break;

            case 'down':
                if((this.position.y + Config.TILE_SIZE) < map2D.y){
                    this.position.y += 32;
                }
                break;
        }

        this.update(this.position)
    }

    /**
     * Move player with the mouse
     *
     * @param {number} targetX
     * @param {number} targetY
     **/
    moveTarget(targetX, targetY) {
        // Calcule du numéro de la case dans le tableaux
        const numberX = Math.trunc(targetX / 32);
        const numberY = Math.trunc(targetY / 32);

        const diffPositionX = Math.abs(this.position.x / Config.TILE_SIZE - numberX);
        const diffPositionY = Math.abs(this.position.y / Config.TILE_SIZE - numberY);

        if(diffPositionX <= 3 && diffPositionY <= 3) {
            if(!this.map.collide(numberX, numberY)) {
                this.position.y = numberY * Config.TILE_SIZE;
                this.position.x = numberX * Config.TILE_SIZE;
            }else {
                alert('Je ne peux pas me déplacer ici !')
            }
        }
        else {
            alert('Je ne peux pas me déplacer ici !')
        }

        // Move to player with the coordinate of the array map calculated

    }

    /**
     * Update player
     * @param {Object} position
     **/
    update(position) {
        this.ctx.drawImage(this.image, 0, 0, 64, 64, position.x, position.y, Config.TILE_SIZE, Config.TILE_SIZE);
    }
}