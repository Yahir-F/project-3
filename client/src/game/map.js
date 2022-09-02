import * as ROT from 'rot-js';

class Map {

    constructor(width, height, tileSize) {
        this.width = width;
		this.height = height;
		this.tileSize = tileSize;
        this.map = new Array(this.width);
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = new Array(this.height);
        }
        this.freeCells = [];
    }

    createMap() {
        const digger = new ROT.Map.Digger(this.width, this.height);
        const diggerCallback = (x, y, value) => {
            this.map[x][y] = value === 0 ? 1 : 0;
        };
        digger.create(diggerCallback);
    };

    drawMap(coords) {
        for (var key in coords) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.map[x][y] = ".";
        }
    };

}

export default Map;