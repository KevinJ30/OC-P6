import {Config} from "../config/Config.js";
import {Spritesheet} from "./Spritesheet.js";

/**
 * Classes PlayerView créer par Joudrier Kevin
 *
 * @property {Spritesheet} sprite
 * @property {Spritesheet} weaponView
 **/
export class PlayerView {

    /**
     * Constructor.
     **/
    constructor(src) {
        this.weaponView = null;
        this.animateDamage = this.animateDamage.bind(this);
        this.sprite = new Spritesheet(src);
    }

    /**
     * @param {string} name : Nom de l'armure
     * @param {string} src : Chemins de la planche de sprite
     * @return {void}
     **/
    addArmorSprite(name, src) {
        this[name] = new Spritesheet(src);
    }

    /**
     * Ajoute une arme au joueur
     * 
     * @param {string} src Cheminde la planche de sprite
     * @return {void}
     **/
    setWeapon(src) {
        this.weaponView = new Spritesheet(src);
    }

    /**
     * Boucle de mise à jour du joueur
     * 
     * @param {PlayerModel} playerModel : Modèle du joueur
     * @param {{x: number, y: number}} position : Cordonnées du joueur sur la map
     * @param {number} playerDirection : Constante de direction du joueur
     * @param {number} scale : Mise a l'échelle du joueur 
     * @param {number} weaponSpriteSelect : Numéro de la sprite séléctionner pour l'arme
     * @return {void}
     **/
    update(gameView, playerModel, position, playerDirection, scale, weaponSpriteSelect) {
        const numberTile = playerDirection;
        const sourceX = Math.floor(numberTile % 9) * 64;
        const sourceY = Math.floor((numberTile / 9)) *  64;

        /**
         * Si la planche de sprite existe on les affiches
         **/
        if(this.sprite) {
            gameView.draw(this.sprite.image, sourceX, sourceY, 64, 64, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }
        
        /**
         * Si les armures existe on les affiches
         **/
        if(this.chest && this.legs && this.foot) {
            gameView.draw(this.chest.image, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            gameView.draw(this.legs.image, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
            gameView.draw(this.foot.image, sourceX, sourceY, playerModel.size.x, playerModel.size.y, position.x, position.y, Config.TILE_SIZE * scale, Config.TILE_SIZE * scale);
        }

        // Affiche l'arme si elle existe
        if(this.weaponView) {
            const sourceXWeapon = Math.floor(weaponSpriteSelect % 9) * 64;
            const sourceYWeapon = Math.floor((weaponSpriteSelect / 9)) *  64;
            gameView.draw(this.weaponView.image, sourceXWeapon, sourceYWeapon, 64, 64, position.x, position.y, scale * 32, scale * 32);
        }
    }

    /**
     * Anime l'attaque du personnage
     * 
     * @param {*} playerModel : Modèle du joueur
     * @param {*} position : Cordonnées du joueur
     * @param {*} scale : Echelle du joueur
     * @return {void}
     **/
    animateAttack(playerModel, position, scale) {
        if(this.weaponView){
            const spriteSelectedBuffer = playerModel.weaponSpriteSelect;
            let i = 0;
            let animation = setInterval(() => {
                playerModel.weaponSpriteSelect  += 1;
                i++;
                if(i >= 8) {
                    playerModel.weaponSpriteSelect = spriteSelectedBuffer;
                    clearInterval(animation);
                }
            }, 50)
        }
    }

    /**
     * Animation du personnage quand il reçoit des dégats
     * 
     * @param {PlayerModel} playerModel : Modèle du joueur
     * @return {void}
     **/
    animateDamage(playerModel) {
        const playerSpriteBuffer = this.sprite;
        const chestSpriteBuffer = this.chest;
        const legsSpriteBuffer = this.legs;
        const footSpriteBuffer = this.foot;
        const weaponSpriteBuffer = this.weaponView !== null ? this.weaponView : null;


        this.sprite = null;
        this.chest = null;
        this.legs = null;
        this.foot = null;

        if(this.weaponView) {
            this.weaponView = null;
        }

        setTimeout(() => {
            this.sprite = playerSpriteBuffer;
            this.chest = chestSpriteBuffer;
            this.legs = legsSpriteBuffer;
            this.foot = footSpriteBuffer;
            this.weaponView = weaponSpriteBuffer;
        }, 250)
    }

    /**
     * Ajoute une case en surbrillance
     *
     * @param {number} position : Cordonnées de la case
     * @param {number} positionGrid : Cordonnées de la grille
     * @param {boolean} vertical : Direction de la case
     * @return {void}
     **/
    addCaseToGrid(gameView, position, positionGrid, vertical) {
        gameView.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        gameView.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        gameView.ctx.fillRect(vertical ? positionGrid : position.x, !vertical ? positionGrid : position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        gameView.ctx.strokeRect(vertical ? positionGrid : position.x, !vertical ? positionGrid : position.y, Config.TILE_SIZE, Config.TILE_SIZE);
        gameView.ctx.fill();
    }

    /**
     * Créer une case en surbrillance a gauche du joueur
     * 
     * @param {*} context : Canvas du jeu
     * @param {*} mapModel : Modèle de la map
     * @param {*} position : Cordonnées de la case
     * @return {void}
     **/
    addGridLeftToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x - Config.TILE_SIZE * (i + 1);

            if(positionGrid >= 0) {
                if(!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, true);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    /**
     * Créer une case en surbrillance a droite du joueur
     * 
     * @param {*} context : Canvas du jeu
     * @param {*} mapModel : Modèle de la map
     * @param {*} position : Cordonnées de la case
     * @return {void}
     **/
    addGridRigthToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = position.x + Config.TILE_SIZE * (i + 1);

            if(positionGrid < Config.MAP_MAX_X * 32) {
                if(!mapModel.collide(Math.floor(positionGrid / 32), Math.floor(position.y / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, true);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    /**
     * Créer une en surbrillance en au dessus du personnage
     * 
     * @param {*} context : Canvas du jeu
     * @param {*} mapModel : Modèle de la map
     * @param {*} position : Cordonnées de la case
     * @return {void}
     **/
    addGridUpToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y - Config.TILE_SIZE * (i + 1));

            if(positionGrid >= 0) {
                if(!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, false);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    /**
     * Créer une en surbrillance en au dessous du personnage
     * 
     * @param {*} context : Canvas du jeu
     * @param {*} mapModel : Modèle de la map
     * @param {*} position : Cordonnées de la case
     * @return {void}
     **/
    addGridDownToPlayer(context, mapModel, position) {
        for(let i = 0; i < 3; i++) {
            let positionGrid = (position.y + Config.TILE_SIZE * (i + 1));

            if(positionGrid < Config.MAP_MAX_Y * 32) {
                if(!mapModel.collide(Math.floor(position.x / 32), Math.floor(positionGrid / 32))) {
                    this.addCaseToGrid(context, position, positionGrid, false);
                }
                else {
                    break;
                }
            }
            else{
                break;
            }

        }
    }

    /**
     * Ajoute la surbrillance des cases du joueur
     *
     * @return void
     **/
    addGridToPlayer(context, mapModel, position) {
        // Add grid to the right player
        this.addGridLeftToPlayer(context, mapModel, position);
        this.addGridRigthToPlayer(context, mapModel, position);
        this.addGridUpToPlayer(context, mapModel, position);
        this.addGridDownToPlayer(context, mapModel, position)
    }

}