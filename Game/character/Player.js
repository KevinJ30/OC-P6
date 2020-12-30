import { Config } from '../config/Config.js';
export class Player {

    constructor (context, sizeX, sizeY, image) {
        this.ctx = context;
        this.image = image;

        this.size = {
            x: sizeX,
            y: sizeY
        }

        this.position = {
            x: 0,
            y: 0
        }
    }

    animate() {
        this.update(this.position)
    }

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

    collide() {
        /**
         * Calculate the dimmension of the map
         **/
        const map2D = {
            x: Config.MAP_MAX_X * 32,
            y: Config.MAP_MAX_Y * 32
        }

        console.log((this.position.x - Config.TILE_SIZE) < 0)
        console.log((this.position.x - Config.TILE_SIZE))
        console.log(map2D.x)

        /**
         * If the player exceed limit of the map
         **/
        if((this.position.x - Config.TILE_SIZE) < 0 || 
           (this.position.x + Config.TILE_SIZE) > map2D.x) {
            return true;
        }

        return false;
    }

    moveTarget(targetX, targetY) {
        // Calcule du numéro de la case dans le tableaux
        const numberX = Math.trunc(targetX / 32);
        const numberY = Math.trunc(targetY / 32);

        // Move to player with the coordinate of the array map calculated

    }

    update(position) {
        this.ctx.drawImage(this.image, 0, 0, 64, 64, position.x, position.y, 32, 32);
    }
}