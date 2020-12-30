import { Config } from '../config/Config.js';
import { Utils } from '../Utils.js';

export class Player {

    constructor (context, sizeX, sizeY, image, map) {
        this.ctx = context;
        this.image = image;
        this.map = map;

        this.size = {
            x: sizeX,
            y: sizeY
        }

        const positionPlayer = this.generatePosition();

        this.position = {
            x: positionPlayer.x,
            y: positionPlayer.y
        }
    }

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

    moveTarget(targetX, targetY) {
        // Calcule du numéro de la case dans le tableaux
        const numberX = Math.trunc(targetX / 32);
        const numberY = Math.trunc(targetY / 32);

        // Move to player with the coordinate of the array map calculated
        if(!this.map.collide(numberX, numberY)) {
            this.position.y = numberY * Config.TILE_SIZE;
            this.position.x = numberX * Config.TILE_SIZE;
        }else {
            alert('Je ne peux pas me déplacer ici !')
        }
    }

    update(position) {
        this.ctx.drawImage(this.image, 0, 0, 64, 64, position.x, position.y, 32, 32);
    }
}