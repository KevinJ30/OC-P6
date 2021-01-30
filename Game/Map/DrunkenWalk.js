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
        let drunken = new Drunken();
        let newMap = map;

        console.log(drunken.life);

        for(let i = 0; i < drunken.life; i++){
            // Changement de driection du drunk aleatoirement
            drunken.direction = Utils.randomNumber(0, 3);

            if(drunken.direction === Drunken.MOVEMENT_LEFT) {
                drunken.moveLeft();
            } else if(drunken.direction === Drunken.MOVEMENT_RIGHT) {
                drunken.moveRight();
            } else if(drunken.direction === Drunken.MOVEMENT_UP) {
                drunken.moveUp();
            } else if(drunken.direction === Drunken.MOVEMENT_DOWN) {
                drunken.moveDown();
            }
            
            newMap[drunken.position.y][drunken.position.x] = Config.GROUND_TILE;
        }
        
        return newMap;
    }

}