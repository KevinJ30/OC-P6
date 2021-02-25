import { Generator } from '../Map/Generator.js';
import { Config } from '../config/Config.js';
import {Utils} from "../Utils.js";

/**
 * Classe MapModel créer par Joudrier Kevin
 * 
 * @property {HTMLImageElement} spriteSheet : Image contenant les Tiles de la map
 * @property {number} tileSize : Largeur et hauteur d'une Tile
 * @property {number} maxTileX : Largeur maximum de la map en nombre de Tile
 * @property {number} maxTileY : Hauteur maximum de la map en nombre de Tile
 * @property {Array} map : Tableau contenant la map
 * @property {Array} mapCollision : Tableau représentant les collision sur la map
 * @property {Array} mapEvents : Tableau représentant les evénement sur la map
 * @property {Generator} generator : Générateur de map procédurale
 * @property {EventManager} eventManager : Liste des événements
 **/

export class MapModel {
    static WEAPON_DRAGONSPEAR = 1;

    /**
     * Constructor
     *
     * @param {number} tileSize
     * @param {number} maxTileX
     * @param {number} maxTileY
     * @param {Observer} dropItemObserver
     * @param {EventManager} eventManager
     */
    constructor(tileSize, maxTileX, maxTileY, eventManager) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = './ressources/tile_map_test.png';
        this.tileSize = tileSize;
        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;
        this.map = [];
        this.mapCollision = [];
        this.mapEvents = [];
        this.generator = null;
        this.eventManager = eventManager;

        // Bind les méthodes et attache les événement
        this.dropItemEvent = this.dropItemEvent.bind(this);
        this.eventManager.attach('game.dropItemEvent', this.dropItemEvent, 0);
    }

    /**
     * Ajoute un générateur
     * 
     * @param {Generator} generator
     * @return {void}
     **/
    addGenerator(generator) {
        this.generator = generator;
    }

    /**
     * Supprime le trésor de guerre poser sur la map
     * 
     * @param {Object} position : Cordonnées de la case sur la map
     **/
    dropItemEvent(position) {
        this.mapEvents[position.y / 32][position.x / 32] = 0;
    }

    /**
     * Construis une map aléatoire
     * 
     * @return {void}
     **/
    build() {
        this.map = this.generator.generatedEmptyMap();
        this.map = this.generator.generateGround();
        this.mapCollision = this.generator.generateMapCollision();
        this.mapEvents = this.generateEventsMap();

        // add four weapon on the map
        for(let i = 0; i < 4; i++) {
            this.addWeapon();
        }
    }

    /**
     * Vérifie si il y a une collision entre les bord de la map
     *
     * @param {number} targetX : Case ciblé en largeur
     * @param {number} targetY : Case ciblé en hauteur
     * @returns {boolean}
     **/
    collideIsEdgeMap(targetX, targetY) {
        return targetX > 0 && targetX / 32 < this.maxTileX && targetY > 0 && targetY / 32 < this.maxTileY;
    }

    /**
     * 
     * @param {number} targetX : Case ciblé en largeur
     * @param {number} targetY : Case ciblé en hauteur
     * @return {boolean}
     */
    collide(targetX, targetY) {
        return this.mapCollision[targetY][targetX];
    }

    /**
     * Construis aléatoirement la map des évenements
     * 
     * @return {array} : map d'événements
     **/
    generateEventsMap() {
        let mapEvents = [];

        for(let i = 0; i < this.maxTileY; i++) {
            let row = [];
            for(let j = 0; j < this.maxTileX; j++) {
                row.push(0);
            }

            mapEvents.push(row);
        }

        return mapEvents;
    }

    /**
     * Ajoute un trésor de guerre aléatoirement sur la map
     * 
     * @return {void}
     **/
    addWeapon() {
        let positionX = Utils.randomNumber(0, this.maxTileX - 1);
        let positionY = Utils.randomNumber(0, this.maxTileY - 1);

        // Genere une nouvelle position si il y a collision dans la map
        while(this.collide(positionX, positionY) || this.mapEvents[positionY][positionX] === MapModel.WEAPON_DRAGONSPEAR) {
            positionX = Utils.randomNumber(0, this.maxTileX - 1);
            positionY = Utils.randomNumber(0, this.maxTileY - 1);
        }

        this.mapEvents[positionY][positionX] = MapModel.WEAPON_DRAGONSPEAR;
    }
}