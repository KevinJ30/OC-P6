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
        let lastDrunkenPosition = null;
        this.drunkens.forEach((drunken) => {
            if(!lastDrunkenPosition) {
                this.position = lastDrunkenPosition;
            }

            for(let i = 0; i < drunken.life; i++){                
                drunken.move();
                newMap[drunken.position.y][drunken.position.x] = Config.GROUND_TILE;
            }
            
            lastDrunkenPosition = drunken.position;
        });

        return newMap;
    }

    randomDirection () {
        return Utils.randomNumber(0, 3);
    }

}