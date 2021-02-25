/**
 * Classe Utils créer par Joudrier Kevin
 **/
export class Utils {

    /**
     * Retourne un nombre aléatoire dans un interval donné
     * 
     * @param {number} min : Interval minimum
     * @param {number} max  : Interval maximum
     * 
     * @return {number} : Nombre aléatoire
     **/
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}