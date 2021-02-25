import {Utils} from '../Utils.js';
import {Config} from '../config/Config.js';

/**
 * Classe Drunken créer par Joudrier Kevin
 * 
 * @property {number} MOVEMENT_LEFT : Constante mouvement a droite
 * @property {number} MOVEMENT_RIGHT : Cnstante mouvement a gauche
 * @property {number} MOVEMENT_UP : Constante mouvement en haut
 * @property {number} MOVEMENT_DOWN : Constante mouvement en bas
 * @property {number} life : Durée de vie 
 * @property {number} direction : Direction
 * @property {Object} position : Cordonnées
 **/
export class Drunken {

    /** CONST MOVEMENT LEFT **/
    static MOVEMENT_LEFT = 0;

    /** CONST MOVEMENT RIGHT */
    static MOVEMENT_RIGHT = 1;

    /** CONST MOVEMENT UP **/
    static MOVEMENT_UP = 2;

    /** CONST MOVEMENT DOWN **/
    static MOVEMENT_DOWN = 3;


    /**
     * @property {number} life
     * @property {number} direction
     * @property {{x, y}} position
     **/
    constructor() {
        this.life = Utils.randomNumber(Config.DRUNKEN_LIFE_MIN, Config.DRUNKEN_LIFE_MAX);
        this.direction = Utils.randomNumber(0, 3);

        this.position = {
            x : Utils.randomNumber(0, Config.MAP_MAX_X - 1),
            y : Utils.randomNumber(0, Config.MAP_MAX_Y - 1)
        };

    }

    /**
     * Edit les cordonnées
     * 
     * @param {{x: number, y: number}} position 
     * @return {void}
     **/
    setPosition(position) {
        this.position = position;
    }

    /**
     * Déplace le drunken
     * 
     * @return {void}
     **/
    move() {
        /** 
         * Séléctionne une direction aléatoire
         **/ 
        const randomDir = Utils.randomNumber(0, 1);

        if(randomDir) {
            this.changeRandomDirection();
        }
        
        /**
         * Déplace le drunken en fonction de sa direction
         **/
        if(this.direction === Drunken.MOVEMENT_LEFT && this.position.x - 1 >= 0) {
            this.position.x--;
        } else if(this.direction === Drunken.MOVEMENT_RIGHT && this.position.x + 1 < Config.MAP_MAX_X - 1){
            this.position.x++;
        } else if(this.direction === Drunken.MOVEMENT_UP && this.position.y - 1 >= 0) {
            this.position.y--;
        } else if(this.direction === Drunken.MOVEMENT_DOWN && this.position.y < Config.MAP_MAX_Y - 1) {
            this.position.y++;
        } else {
            this.changeRandomDirection();
        }
    }

    /**
     * Déplacement du drunken a gauche
     * 
     * @return {void}
     **/
    moveLeft() {
        if(this.position.x > 0) {
            this.position.x--;
        }
        else {
            if(this.position.y < Config.MAP_MAX_X - 1) {
                this.direction = Drunken.MOVEMENT_DOWN;
            }
            else {
                this.direction = Drunken.MOVEMENT_UP;
            }
        }
    }

    /**
     * Déplacement du drunken a droite
     * 
     * @return {void}
     **/
    moveRight() {
        if(this.position.x < Config.MAP_MAX_X - 1) {
            this.position.x++;
        }
        else {
            if(this.position.y < 0) {
                this.direction = Drunken.MOVEMENT_DOWN;
            }
            else {
                this.direction = Drunken.MOVEMENT_UP;
            }
        }
    }

    /**
     * Déplacement du drunken en haut
     * 
     * @return {void}
     **/
    moveUp() {
        if(this.position.y > 0) {
            this.position.y--;
        }
        else {
            if(this.position.x > Config.MAP_MAX_Y) {
                this.direction = Drunken.MOVEMENT_RIGHT;
            }
             else {
                 this.direction = Drunken.MOVEMENT_LEFT;
             }
        }
    }

    /**
     * Déplacement du drunken en bas
     * 
     * @return {void}
     **/
    moveDown() {
        if(this.position.y < Config.MAP_MAX_Y - 1) {
            this.position.y++;
        }
        else {
            if(this.position.x > 0) {
                this.direction = Drunken.MOVEMENT_LEFT;
            }
            else {
                this.direction = Drunken.MOVEMENT_RIGHT;
            }
        }
    }

    /**
     * Génére un direction aléatoire
     * 
     * @return {void}
     **/
    changeRandomDirection() {
        this.direction = Utils.randomNumber(0, 3);
    }
}