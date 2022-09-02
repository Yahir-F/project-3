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

    drawMap() {
        let rows = [];
        let row;
        for(let y = 0; y < this.height; y++) {
            row = [];
            for(let x = 0; x < this.width; x++) {
                row.push(<span className={`tile ${this.map[x][y].tileClass}`} key={x}></span>)
            }
            rows.push(<div className='row' key={y}>{row}</div>)
        }
        return (rows);
    };

}

export default Map;