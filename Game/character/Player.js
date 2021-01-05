import { Config } from '../config/Config.js';
import { Utils } from '../Utils.js';

export class Player {

    /**
     * Constructor.
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {HTMLImageElement} image
     * @param {Object} map
     **/
    constructor (context, sizeX, sizeY, image, map, position) {
        this.ctx = context;
        this.image = image;
        this.map = map;
        this.selectedPlayer = true;
        this.size = { x: sizeX, y: sizeY };
        this.position = position;
        this.health = 100;
        this.velocity = 4; // Valeur divisible par 32
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

            console.log(positionGrid / 32, this.position.y / 32)

            if(this.map.collideIsEdgeMap(this.position.x + Config.TILE_SIZE, this.position.y)) {
                if (!this.map.collide(Math.floor(positionGrid / 32), Math.floor(this.position.y / 32))) {
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
                if (!this.map.collide(Math.floor(positionGrid / 32), Math.floor(this.position.y / 32))) {
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
                if (!this.map.collide(Math.floor(this.position.x / 32), Math.floor(positionGrid / 32))) {
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
                if (!this.map.collide(Math.floor(this.position.x / 32), Math.floor(positionGrid / 32))) {
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
                    this.position.x -= this.velocity;
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

        if(diffPositionX <= 3 && diffPositionY <= 3 && diffPositionX !== 0 && diffPositionY === 0 || diffPositionY !== 0 && diffPositionX === 0) {
            //debugger
            if(!this.map.collide(numberX, numberY)) {
                // si le player ce deplace l'axe x
                if(diffPositionX !== 0 && diffPositionY === 0) {
                    const behind = {
                        x : numberX - this.position.x / Config.TILE_SIZE < 0,
                        y : numberY - this.position.y / Config.TILE_SIZE < 0
                    }

                    this.animate(true,{
                        x: numberX,
                        y: numberY
                    }, behind)
                }
                else if(diffPositionY !== 0 && diffPositionX === 0) {
                    const behind = {
                        x : numberX - this.position.x / Config.TILE_SIZE < 0,
                        y : numberY - this.position.y / Config.TILE_SIZE < 0
                    }

                    this.animate(false,{
                        x: numberX,
                        y: numberY
                    }, behind)
                }

            }else {
                alert('Je ne peux pas me déplacer ici !')
            }
        }
        else {
            alert('Je ne peux pas me déplacer ici !')
        }
    }

    animate(vertical, movementPosition, behind = false) {
        let i = 0;
        let loopAnimate = setInterval(() => {
            //debugger
            if(vertical) {
                if(movementPosition.x !== this.position.x / 32) {
                        if(!behind.x) {
                            this.position.x += this.velocity;
                        } else {
                            this.position.x -= this.velocity;
                        }
                }
                else {
                    clearInterval(loopAnimate);
                }
            }
            else {
                if(movementPosition.y !== this.position.y / 32) {
                    if(!behind.y) {
                        this.position.y += this.velocity;

                    } else {
                        this.position.y -= this.velocity;
                    }
                }
                else {
                    clearInterval(loopAnimate);
                }
            }

        }, 16)
    }

    /**
     * Update player
     * @param {Object} position
     **/
    update(position) {
        this.ctx.drawImage(this.image, 0, 0, 64, 64, position.x, position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        this.addGridToPlayer();
    }
}