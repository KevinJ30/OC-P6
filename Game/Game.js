export class Game {

    static mapO;
    static ctx;

    /**
     * @param {Object} map
     * @param {Object} context
     **/
    constructor(map, context) {
        this.map = map;
        this.ctx = context;
        this.map.generated();
    }
    
    drawMap() {
        for(let i = 0; i < this.map.maxTileY; i++) {
            for(let j = 0; j < this.map.maxTileX; j++) {
                const positionTile = {
                    x : j * this.map.tileSize,
                    y : i * this.map.tileSize
                }

                const sourceX = Math.floor((18 - 1) % 16) * this.map.tileSize;
                const sourceY = Math.floor(18 / 16) *  this.map.tileSize;

                this.ctx.drawImage(this.map.tileImg, sourceX, sourceY, this.map.tileSize, this.map.tileSize, positionTile.x, positionTile.y, this.map.tileSize, this.map.tileSize);
            }
        }
    }

    /**
     * Cette méthode est utilisé dans la boucle du jeu
     **/
    update() {
        this.drawMap()
    }

}