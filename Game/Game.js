export class Game {

    static map;
    static ctx;

    /**
     * @param {Object} map
     * @param {Object} context
     **/
    constructor(map, context) {
        this.map = map;
        this.ctx = context;
        this.map.build();
    }

    /**
     * Cette méthode est utilisé dans la boucle du jeu
     **/
    update() {
        this.map.drawMap(this.ctx);
    }

}