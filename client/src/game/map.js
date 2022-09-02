import * as ROT from 'rot-js';
import Tile from './tile';

class Map {

    constructor(width, height) {
        this.width = width;
		this.height = height;
        this.map = new Array(this.width);
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = new Array(this.height);
        }
        this.freeTiles = [];
    }

    createMap() {
        const digger = new ROT.Map.Digger(this.width, this.height);
        const diggerCallback = (x, y, value) => {
            this.map[x][y] = (value === 0) ? new Tile(x, y, 'floor') : new Tile(x, y, 'wall');
            if(!value) {
                this.freeTiles.push(this.map[x][y]);
            }
        };
        digger.create(diggerCallback);
    };

    /* drawMap(coords) {
        for (var key in coords) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.map[x][y] = ".";
        }
    }; */

}

export default Map;