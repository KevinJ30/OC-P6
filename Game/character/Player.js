import { Config } from '../config/Config.js';
import { LegsArmor } from './Armor/LegsArmor.js';
import { ChestArmor } from './Armor/ChestArmor.js';
import {FootArmor} from "./Armor/FootArmor.js";
import {DragonspearWeapon} from "./Weapon/DragonspearWeapon.js";

export class PlayerTile {
    static LEFT = 9;
    static RIGHT = 27;
    static UP = 0;
    static DOWN = 18;
}

export class Player {
    /**
     * Constructor.
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {HTMLImageElement} image
     * @param {Object} map
     * @param {x, y, numberTile} position
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
        this.playerDirection = PlayerTile.LEFT;
        this.chest = new ChestArmor();
        this.legs = new LegsArmor();
        this.foot = new FootArmor();
        this.weapon = new DragonspearWeapon()
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
    // move(direction) {
    //     /**
    //      * Calculate the dimmension of the map
    //      **/
    //     const map2D = {
    //         x: Config.MAP_MAX_X * 32,
    //         y: Config.MAP_MAX_Y * 32
    //     }

    //     switch(direction) {
    //         case 'left':
    //             if(this.position.x > 0) {
    //                 this.position.x -= this.velocity;
    //             }
    //             break;

    //         case 'right':
    //             if((this.position.x + Config.TILE_SIZE) < map2D.x){
    //                 this.position.x += 32;
    //             }
    //             break;

    //         case 'up':
    //             if(this.position.y > 0){
    //                 this.position.y -= 32;
    //             }
    //             break;

    //         case 'down':
    //             if((this.position.y + Config.TILE_SIZE) < map2D.y){
    //                 this.position.y += 32;
    //             }
    //             break;
    //     }

    //     this.update(this.position)
    // }

    /**
     * Move player with the mouse
     *
     * @param {number} targetX
     * @param {number} targetY
     **/
    // /moveTarget(targetX, targetY) {
    //     // Calcule du numéro de la case dans le tableaux
    //     const numberX = Math.trunc(targetX / 32);
    //     const numberY = Math.trunc(targetY / 32);

    //     const diffPositionX = Math.abs(this.position.x / Config.TILE_SIZE - numberX);
    //     const diffPositionY = Math.abs(this.position.y / Config.TILE_SIZE - numberY);

    //     if(diffPositionX <= 3 && diffPositionY <= 3 && diffPositionX !== 0 && diffPositionY === 0 || diffPositionY !== 0 && diffPositionX === 0) {
    //         //debugger
    //         if(!this.map.collide(numberX, numberY)) {
    //             // si le player ce deplace l'axe x
    //             if(diffPositionX !== 0 && diffPositionY === 0) {
    //                 const behind = {
    //                     x : numberX - this.position.x / Config.TILE_SIZE < 0,
    //                     y : numberY - this.position.y / Config.TILE_SIZE < 0
    //                 }

    //                 this.animate(true,{
    //                     x: numberX,
    //                     y: numberY
    //                 }, behind)
    //             }
    //             else if(diffPositionY !== 0 && diffPositionX === 0) {
    //                 const behind = {
    //                     x : numberX - this.position.x / Config.TILE_SIZE < 0,
    //                     y : numberY - this.position.y / Config.TILE_SIZE < 0
    //                 }

    //                 this.animate(false,{
    //                     x: numberX,
    //                     y: numberY
    //                 }, behind)
    //             }

    //         }else {
    //             alert('Je ne peux pas me déplacer ici !')
    //         }
    //     }
    //     else {
    //         alert('Je ne peux pas me déplacer ici !')
    //     }
    // }

    // animate(vertical, movementPosition, behind = false) {
    //     let i = 0;
    //     let loopAnimate = setInterval(() => {
    //         if(vertical) {
    //             if(movementPosition.x !== this.position.x / 32) {
    //                     if(!behind.x) {
    //                         this.moveRight();
                            
    //                         // Change sprite movement left player
    //                         this.position.numberTile =  Math.floor(i % 9) + PlayerTile.RIGHT;
    //                     } else {
    //                         this.moveLeft();
                            
    //                         // Change sprite movement left player
    //                         this.position.numberTile =  Math.floor(i % 9) + PlayerTile.LEFT;
    //                     }
    //             }
    //             else {
    //                 clearInterval(loopAnimate);
    //             }
    //         }
    //         else {
    //             if(movementPosition.y !== this.position.y / 32) {
    //                 if(!behind.y) {
    //                     this.moveDown();

    //                 } else {
    //                     this.moveUp();
    //                 }
    //             }
    //             else {
    //                 clearInterval(loopAnimate);
    //             }
    //         }
    //         i++;
    //     }, 16)
    // }

    /**
     * Mouse player with mosue
     * 
     * @param {number} targetX  : target mouse click in x
     * @param {number} targetY  : target mosue click in y
     **/
    moveTarget(targetX, targetY) {
        /**
         * calculated number case of the array map
         **/
        const caseNumberX = Math.trunc(targetX / 32);
        const caseNumberY = Math.trunc(targetY / 32);

        /**
         * Calculate the position difference
         **/
        const diffPositionX = caseNumberX - this.position.x / Config.TILE_SIZE;
        const diffPositionY = caseNumberY - this.position.y / Config.TILE_SIZE;

        /**
         * Detect the collision and maximum number of case movement
         **/

        // Map end collision 
        if(Math.abs(diffPositionX) <= 3 && Math.abs(diffPositionY) <= 3 && Math.abs(diffPositionX) !== 0 && Math.abs(diffPositionY) === 0 || Math.abs(diffPositionY) !== 0 && Math.abs(diffPositionX) === 0) {

            // Collision with wall map
            if(!this.map.collide(caseNumberX, caseNumberY)) {
                
                /**
                 * Determined direction movement player
                 **/
                
                 // Movement left Player
                if(diffPositionX !== 0 && diffPositionY === 0 && diffPositionX < 0) {
                    this.moveLeft(this.position.x + diffPositionX * 32);

                }
                else if(diffPositionX !== 0 && diffPositionY === 0 && diffPositionX > 0) {
                    this.moveRight(this.position.x + diffPositionX * 32);
                }
                else if(diffPositionY !== 0 && diffPositionX === 0 && diffPositionY < 0) {
                    this.moveUp(this.position.y + diffPositionY * 32);
                }
                else if(diffPositionY !== 0 && diffPositionX === 0 && diffPositionY > 0) {
                    this.moveDown(this.position.y + diffPositionY * 32);
                }
            }
            else {
                alert('Je ne peux pas me déplacer ici !');
            }
        }
        else {
            // Envoyer une message sur le jeu
            alert('Je ne peux pas me déplacer ici !');
        }
    }   

    /**
     * Move left player
     * @return void
     */
    moveLeft(newPosition) {
        this.playerDirection = PlayerTile.LEFT;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerTile.LEFT;
                this.position.x -= this.velocity;
                i++;
            }
            else {
                this.playerDirection = PlayerTile.LEFT;
                clearInterval(animate);
            }
        }, 16);
    }

    /**
     * Move right player
     * @return void
     **/
    moveRight(newPosition) {
        this.playerDirection = PlayerTile.RIGHT;

        let i = 0;
        console.log(Math.floor(i % 9) + PlayerTile.RIGHT)
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerTile.RIGHT;
                this.position.x += this.velocity;
                i++;
            }
            else{
                this.playerDirection = PlayerTile.RIGHT;
                clearInterval(animate);
            }
        }, 16)
    }

    /**
     * Move up player
     * @return void
     **/
    moveUp(newPosition) {
        this.playerDirection = PlayerTile.UP;

        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                this.playerDirection = Math.floor(i % 9) + PlayerTile.UP;
                this.position.y -= this.velocity;
                i++;
            }
            else {
                this.playerDirection = PlayerTile.UP;
                clearInterval(animate);
            }
        }, 16);
        
    }

    /**
     * Move down player
     * @return void
     **/
    moveDown(newPosition) {
        this.playerDirection = PlayerTile.DOWN;
        let i = 0;

        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                // Calculated playerDirection sprite
                this.playerDirection = Math.floor(i % 9) + PlayerTile.DOWN;
                this.position.y += this.velocity;
                i++;
            }
            else {
                this.playerDirection = PlayerTile.DOWN;
                clearInterval(animate);
            }
        }, 16); 
    }

    /**
     * Update player
     * @param {Object} position
     **/
    update(position) {
        // selected tile with tileset
        const numberTile = this.playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        this.ctx.drawImage(this.image, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        //this.ctx.drawImage(this.image, sourceX, sourceY, 64, 64, position.x, position.y, 32, 32);
        this.chest.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.legs.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.foot.draw(this.ctx, sourceX, sourceY, position.x, position.y);
        this.weapon.draw(this.ctx, sourceX, sourceY, position.x, position.y);

        console.log(sourceX, sourceY, numberTile);

        this.addGridToPlayer();
    }
}