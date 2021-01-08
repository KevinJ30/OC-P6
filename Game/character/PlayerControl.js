import {Config} from "../config/Config.js";
import {DragonspearWeapon} from "./Weapon/DragonspearWeapon.js";
import {PlayerSprite} from "./Player.js";

export class PlayerControl {
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
        if(Math.abs(diffPositionX) <= 3 && Math.abs(diffPositionY) <= 3) {
            if(Math.abs(diffPositionX) !== 0 && Math.abs(diffPositionY) === 0 || Math.abs(diffPositionY) !== 0 && Math.abs(diffPositionX) === 0) {

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
        else {
            alert('Je ne peux pas me déplacer ici !');
        }
    }

    /**
     * Move left player
     * @return void
     */
    moveLeft(newPosition) {
        this.playerDirection = PlayerSprite.LEFT;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.LEFT;
                this.position.x -= this.velocity;
                i++;
            }
            else {
                this.dropItem();

                this.playerDirection = PlayerSprite.LEFT;
                this.roundObserver.notify()
                clearInterval(animate);
            }
        }, 16);
    }

    dropItem() {
        if(this.map.mapEvents[this.position.y / 32][this.position.x / 32]) {
            this.weapon = new DragonspearWeapon();
            this.dropItemObserver.notify(this.position);
        }
    }

    /**
     * Move right player
     * @return void
     **/
    moveRight(newPosition) {
        this.playerDirection = PlayerSprite.RIGHT;

        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.RIGHT;
                this.position.x += this.velocity;
                i++;
            }
            else{
                this.dropItem();
                this.playerDirection = PlayerSprite.RIGHT;
                this.roundObserver.notify()
                clearInterval(animate);
            }
        }, 16)
    }

    /**
     * Move up player
     * @return void
     **/
    moveUp(newPosition) {
        this.playerDirection = PlayerSprite.UP;

        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.UP;
                this.position.y -= this.velocity;
                i++;
            }
            else {
                this.dropItem();
                this.playerDirection = PlayerSprite.UP;
                this.roundObserver.notify()
                clearInterval(animate);
            }
        }, 16);

    }

    /**
     * Move down player
     * @return void
     **/
    moveDown(newPosition) {
        this.playerDirection = PlayerSprite.DOWN;
        let i = 0;

        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                // Calculated playerDirection sprite
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.DOWN;
                this.position.y += this.velocity;
                i++;
            }
            else {
                this.dropItem();
                this.playerDirection = PlayerSprite.DOWN;
                this.roundObserver.notify()
                clearInterval(animate);
            }
        }, 16);
    }
}