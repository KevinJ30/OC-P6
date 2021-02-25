import { Config } from '../config/Config.js';
import {WeaponModel} from "./WeaponModel.js";

/**
 * Classe Static PlayerSprite créer par Joudrier Kevin
 * 
 * Constantes numéro de la tile en fonction de la direction
 **/
export class PlayerSprite {
    static LEFT = 9;
    static RIGHT = 27;
    static UP = 0;
    static DOWN = 18;
}

/**
 * Classe PlayerModel créer par Joudrier Kevin
 * 
 * @property {HTMLImageElement} image : Image contenant les Tiles du personnage
 * @property {MapModel} mapModel : Classe MapModel
 * @property {number} size : Largeur et hauteur du personnage
 * @property {Object} position : Cordonnées du joueur
 * @property {number} health : Vie du joueur
 * @property {number} velocity : Vitesse de déplacement du joueur
 * @property {number} playerDirection : Direction du joueur
 * @property {Armor} chest : Armure plastron
 * @property {Armor} legs : Armure pantalon
 * @property {Armor} foot : Armure chaussure 
 * @property {WeaponModel} weapon : Modèle de la class ArmeModel
 * @property {number} damage : Nombre de dégat de base que le personnage inflige
 * @property {string} username : Nom du joueur
 * @property {boolean} defend : Indique si le personnage ce defend
 * pour les prochains dégats qu'il reçoit
 * @property {EventManager} eventManager : Liste des événements
 * @property {number} weaponSpriteSelect : Numéro de la Tile séléctionné pour l'arme
 * @property {boolean} isMovement : Indique quand le joueur ce déplace
 * 
 **/
export class PlayerModel {
    /**
     * Constructor.
     *
     * @param {EventManager} eventManager
     * @param {number} sizeX : largeur du personnage
     * @param {number} sizeY : Hauteur du personnage
     * @param {MapModel} mapModel : Classe modèle de la map
     * @param {x, y, numberTile} position : Position du joueur
     **/
    constructor (eventManager, sizeX, sizeY, mapModel, position) {
        this.mapModel = mapModel;
        this.size = { x: sizeX, y: sizeY };
        this.position = position;
        this.health = 100;
        this.velocity = 4;
        this.playerDirection = PlayerSprite.LEFT;
        this.chest = null;
        this.legs = null;
        this.foot = null;
        this.weapon = null;
        this.damage = 5;
        this.username = "No Player Name"
        this.defend = false;
        this.eventManager = eventManager;
        this.weaponSpriteSelect = 0;
        this.isMovement = false;
    }

    /**
     * Ajoute une arme au joueur
     * 
     * @param {WeaponModel} weapon
     * 
     * @return {void}
     **/
    setWeapon(weapon) {
        this.weapon = weapon;
    }

    /**
     * Ajoute un nom au joueur
     * 
     * @param {string} username
     * 
     * @return {void} 
     **/
    setName(username) {
        this.username = username;
    }

    /**
     * Reçoit des dégats
     * 
     * @param {number} quantity
     * 
     * @return {void}
     **/
    receiveDamage(quantity) {
        this.health -= !this.defend ? quantity : quantity / 2;

       if(this.health <= 0) {
            this.health = 0;
        }
    }

    /**
     * Retourne le nombre de dégat que peux infliger le joueur
     * 
     * @return {number} : Nombre de dégats
     **/
    getDamage() {
        if(this.weapon) {
            return this.weapon.damage;
        }

        return this.damage;
    }

    /**
     * Indique si le joueur est mort
     * 
     * @return {boolean} mort du personnage
     **/
    isDead() {
        return this.health <= 0;
    }

    /**
     * Déplacement du joueur
     **/

    /**
     * Déplacement du joueur avec le clique de souris
     *
     * @param {number} targetX  : Position du clique sur la largeur de la map
     * @param {number} targetY  : Position du clique sur la hauteur de la map
     **/
    moveTarget(targetX, targetY) {
        /**
         * Détermine la position en nombre de tile sur la map
         **/
        const caseNumberX = Math.trunc(targetX / 32);
        const caseNumberY = Math.trunc(targetY / 32);

        /**
         * Calcule la différence de position entre le personnage 
         * et la zone cliqué sur la map
         **/
        const diffPositionX = caseNumberX - this.position.x / Config.TILE_SIZE;
        const diffPositionY = caseNumberY - this.position.y / Config.TILE_SIZE;

        /**
         * Gestions des collision sur la map
         **/

        // Le déplacement sur la map doit êtres inférieure a 3 case
        if(Math.abs(diffPositionX) <= 3 && Math.abs(diffPositionY) <= 3) {
            if(Math.abs(diffPositionX) !== 0 && Math.abs(diffPositionY) === 0 || Math.abs(diffPositionY) !== 0 && Math.abs(diffPositionX) === 0) {

                // Vérifie qu'il n'y est pas de collision sur la map
                if(!this.mapModel.collide(caseNumberX, caseNumberY)) {

                    /**
                     * Détermine la direction du joueur
                     **/
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
     * Indique si le joueur est en train de ce dépolacer
     * 
     * @return {boolean}
     **/
    checkIsMovement() {
        return this.isMovement;
    }

    /**
     * Si le joueur ce trouve sur la case d'un trésor de guerre
     * on ajoute une arme aléatoire dans la mains
     * 
     * @return {void}
     **/
    dropItem() {
        if(this.mapModel.mapEvents[this.position.y / 32][this.position.x / 32]) {
            this.eventManager.trigger('game.dropItemEvent', null, [this.position, this]);
        }
    }

    /**
     * Déplacement du joueur à gauche
     * 
     * @param {number} newPosition : Case sur laquel doit ce déplacer le personnage
     * @return void
     */
    moveLeft(newPosition) {
        this.playerDirection = PlayerSprite.LEFT;
        this.weaponSpriteSelect = PlayerSprite.LEFT;
        this.isMovement = true;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.LEFT;
                this.weaponSpriteSelect = Math.floor(i % 9) + PlayerSprite.LEFT;
                this.position.x -= this.velocity;
                i++;
            }
            else {
                this.isMovement = false;
                this.dropItem();
                this.playerDirection = PlayerSprite.LEFT;
                this.weaponSpriteSelect = PlayerSprite.LEFT;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16);
    }

    /**
     * Déplacement du joueur à droite
     * 
     * @param {number} newPosition : Case sur laquel doit ce déplacer le personnage
     * @return void
     */
    moveRight(newPosition) {
        this.playerDirection = PlayerSprite.RIGHT;
        this.weaponSpriteSelect = PlayerSprite.RIGHT;
        this.isMovement = true;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.x) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.RIGHT;
                this.weaponSpriteSelect = Math.floor(i % 9) + PlayerSprite.RIGHT;
                this.position.x += this.velocity;
                i++;
            }
            else{
                this.isMovement = false;
                this.dropItem();
                this.playerDirection = PlayerSprite.RIGHT;
                this.weaponSpriteSelect = PlayerSprite.RIGHT;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16)
    }

    /**
     * Déplacement du joueur au dessus
     * 
     * @param {number} newPosition : Case sur laquel doit ce déplacer le personnage
     * @return void
     */
    moveUp(newPosition) {
        this.playerDirection = PlayerSprite.UP;
        this.weaponSpriteSelect = PlayerSprite.UP;
        this.isMovement = true;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.UP;
                this.weaponSpriteSelect = Math.floor(i % 9) + PlayerSprite.UP;
                this.position.y -= this.velocity;
                i++;
            }
            else {
                this.isMovement = false;
                this.dropItem();
                this.playerDirection = PlayerSprite.UP;
                this.weaponSpriteSelect = PlayerSprite.UP;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16);

    }

    /**
     * Déplacement du joueur à dessous
     * 
     * @param {number} newPosition : Case sur laquel doit ce déplacer le personnage
     * @return void
     */
    moveDown(newPosition) {
        this.playerDirection = PlayerSprite.DOWN;
        this.weaponSpriteSelect = PlayerSprite.DOWN;
        this.isMovement = true;
        let i = 0;
        let animate = setInterval(() => {
            if(newPosition !== this.position.y) {
                // Calculated playerDirection sprite
                this.playerDirection = Math.floor(i % 9) + PlayerSprite.DOWN;
                this.weaponSpriteSelect = Math.floor(i % 9) + PlayerSprite.DOWN;
                this.position.y += this.velocity;
                i++;
            }
            else {
                this.isMovement = false;
                this.dropItem();
                this.playerDirection = PlayerSprite.DOWN;
                this.weaponSpriteSelect = PlayerSprite.DOWN;
                this.eventManager.trigger('game.changeRoundEvent');
                clearInterval(animate);
            }
        }, 16);
    }
}