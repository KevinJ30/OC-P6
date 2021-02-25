import { Utils } from '../Utils.js';
import {Config} from "../config/Config.js";
import {Drunken} from "./Drunken.js";
import {DrunkenWalk} from "./DrunkenWalk.js"

/**
 * Classe Generator créer par Joudrier Kevin
 **/
export class Generator {

    /**
     * Constructor.
     *
     * @param maxTileX : Largeur maximum de la map en nombre de Tile
     * @param maxTileY : Hauteur Maximum de la map en nombre de Tile
     * @param blankTileNumber : Numéro de la tile qui correspond à rien
     * @param wallTileNumber : Numéro de la tile qui correspond a un mur
     **/
    constructor(maxTileX, maxTileY, blankTileNumber, wallTileNumber) {
        this.drunkenWalk = new DrunkenWalk(3);

        this.maxTileX = maxTileX;
        this.maxTileY = maxTileY;

        this.BLANK_TILE = blankTileNumber;
        this.WALL_TILE = wallTileNumber;

        this.map = [];
        this.mapCollision = [];
    }

    /**
     * Créer une map vierge qu'avec des murs
     *
     * @returns {Array} map
     **/
    generatedEmptyMap() {
        for(let i = 0; i < this.maxTileY; i++) {
            let row = [];
            let colsCollision = [];

            for(let j = 0; j < this.maxTileX; j++) {
                row.push(Config.WALL_TILE);
                colsCollision.push(0);
            }

            this.map.push(row);
            this.mapCollision.push(colsCollision);
        }

        return this.map;
    }


    /**
     * ALGO : DRUNKEN WALK
     * -------------------
     * 
     * Le sol de la map est générer avec l'algoritme appellé Drunken Walk
     * Cette algo consiste a créer des objets fixtif qui vont parcourir la map avec une position de départ
     * aléatoire. Une durée de vie est calculé pour detruire cette objet au bout d'un moment,
     * dans notre cas on exprime la durée de vie en nombre de case de la map a parcourir.
     * 
     * Pendant sa phase de déplacement on va contrôler qu'il arrive pas sur les bords de la map
     * Si cest le cas on lui fait changer de coté. Exp: si il était en train de déscendre on et qui touche un bord de la map
     * on lui dit d'aller a gauche et ainsi de suite. 
     * 
     * En sachant que pendant sa phase de déplacement, on fait changer de sens aléatoirement pour qu'il ne garde pas cette aspect linéaire.
     * 
     * On pourra également en lancer plusieur les un après les autres, voirs en même temps ou en décalage.
     **/

    /**
     * Créer le sol de la map
     * 
     * @return {}
     **/
    generateGround() {
        // Nombre de drunk créé sur la map   
        this.drunkenWalk.init();

        // Retourne la nouvelle générer quand on démarrer les drunks
        return this.drunkenWalk.startDrunk(this.map);
    }

    /**
     * Créer la map de collision avec le murs qu'il reste sur la map
     * 
     * @return {Array} mapCollision : Map de collision
     **/
    generateMapCollision() {
        let map = this.map;

        let mapCollision = [];
        for(let i = 0; i < this.maxTileY; i++) {
            let mapRow = [];
            for(let j = 0; j < this.maxTileX; j++) {
                if(map[i][j] === Config.WALL_TILE) {
                    mapRow.push(1)
                }
                else {
                    mapRow.push(0)
                }
            }
          
            mapCollision.push(mapRow);
        }

        return mapCollision;
    }
}