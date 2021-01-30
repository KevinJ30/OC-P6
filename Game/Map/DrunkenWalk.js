import {Config} from '../config/Config.js';
import {Drunken} from './Drunken.js';
import {Utils} from '../Utils.js';

export class DrunkenWalk {

    constructor(numberDrunken) {
        this.numberDrunken = numberDrunken;
        this.drunkens = [];
    }

    init() {
        for(let i = 0; i < this.numberDrunken; i++) {
            this.drunkens.push(new Drunken());
        }
    }

    startDrunk(map) {
        let newMap = map;
        
        let lastPosition = {
            x: null,
            y: null
        };
        
        this.drunkens.forEach((drunken) => {
            for(let i = 0; i < drunken.life; i++){                
                drunken.move(drunken.position);
                console.log(drunken.position.y, drunken.position.x);
                newMap[drunken.position.y][drunken.position.x] = Config.GROUND_TILE;
            }

        });

        return newMap;
    }

    

    // Si il y a collision on change la direction au drunken
    /**detectCollision(drunken, map) {
        if(drunken.direction === Drunken.MOVEMENT_LEFT) {
            if(drunken.position.x - 1 > 0) {
                if(map[drunken.position.y][drunken.position.x - 1] === Config.GROUND_TILE) {
                    return true;
                }
            }
        } else if(drunken.direction === Drunken.MOVEMENT_RIGHT) {
            if(drunken.position.x + 1 > Config.MAP_MAX_X) {
                if(map[drunken.position.y][drunken.position.x + 1] === Config.GROUND_TILE) {
                    return true;
                }
            }
        } else if(drunken.direction === Drunken.MOVEMENT_UP) {
            if(drunken.position.y - 1 > 0) {
                if(map[drunken.position.y - 1][drunken.position.x] === Config.GROUND_TILE) {
                    return true;
                }
            }
        } else if(drunken.direction === Drunken.MOVEMENT_DOWN) {
            if(drunken.position.y + 1 < Config.MAP_MAX_Y) {
                if(map[drunken.position.y + 1][drunken.position.x] === Config.GROUND_TILE) {
                    return true;
                }
            }

        }
        
        return false;
    }**/

    randomDirection () {
        return Utils.randomNumber(0, 3);
    }

}