/**
 * class WeaponModel créer par Joudrier Kevin
 * 
 * @property {string} name : Nom de l'arme
 * @property {number} damage : Dégats de l'arme
 **/
export class WeaponModel {
    /**
     * @param {string} name : Nom de l'arme
     * @param {number} damage : Dégats de l'arme
     **/
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }
}