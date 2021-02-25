import {Config} from '../config/Config.js';
import {Drunken} from './Drunken.js';

/**
 * classe DrunkenWalk créer par Joudrier Kevin
 * 
 * Inspiré de l'algorithme Random Walker
 * https://en.wikipedia.org/wiki/Random_walker_algorithm
 * 
 * @property {number} numberDrunken : Nombre de drunken utilisé
 * @property {Array} drunkens : Tableau contenant les drunkens
 **/
export class DrunkenWalk {

    constructor(numberDrunken) {
        this.numberDrunken = numberDrunken;
        this.drunkens = [];
    }

    /**
     * Initialisation du tableau de drunken
     * 
     * @return {void}
     **/
    init() {
        for(let i = 0; i < this.numberDrunken; i++) {
            this.drunkens.push(new Drunken());
        }
    }

    /**
     * Démarrer les drunkens sur la map
     * 
     * @param {array} map : Tableau contenant la map
     * @return {array} Nouvelle map
     **/
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
}