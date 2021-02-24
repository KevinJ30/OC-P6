
/**
 * Configuration du jeu video
 *
 * Créer par Joudrier Kevin
 **/
export let Config = {
    /**
     * @property {number} MAP_MAX_X : Dimmension en largeur de la map exprimé en nombre de tile
     **/
    MAP_MAX_X: 20,

    /**
     * @property {number} MAP_MAX_Y : Diommension en hauteur de la map exprimé en nombre de tile
     **/
    MAP_MAX_Y: 15,

    /**
     * @property {number} TILE_SIZE : Dimmension en hauteur et largeur d'une tile
     **/
    TILE_SIZE: 32,

    /**
     * @property {number} MAX_NUMBER_TILESET : Nombre de tile par ligne sur la spritesheet
     **/
    MAX_NUMBER_TILESET: 14,

    /**
     * Configuration du generateur
     **/

     /**
      * @property {number} WALL_TILE : Numéro de la tile correspondant a un mur sur la spritesheet
      **/
    WALL_TILE: 2,

    /**
     * @property {number} GROUND_TILE : Numéro de la correspondant a un sol sur la spritesheet
     **/
    GROUND_TILE: 1,

    /**
     * @property {number} DRUNKEN_LIFE_MIN : Durée de vie minimum d'un marcheur
     **/
    DRUNKEN_LIFE_MIN: 50,

    /**
     * @property {number} DRUNKEN_LIFE_MIN : Durée de vie maximum d'un marcheur
     **/
    DRUNKEN_LIFE_MAX: 350
}