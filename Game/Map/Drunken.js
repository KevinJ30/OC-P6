import {Utils} from '../Utils.js';
import {Config} from '../config/Config.js';


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
        this.life = Utils.randomNumber(0, Config.MAP_MAX_X * Config.MAP_MAX_Y / 5);
        
        this.direction = Utils.randomNumber(0, 3);

        this.position = {
            x : Utils.randomNumber(0, Config.MAP_MAX_X - 1),
            y : Utils.randomNumber(0, Config.MAP_MAX_Y - 1)
        };
    }

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
}