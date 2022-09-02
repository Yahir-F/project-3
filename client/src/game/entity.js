import Tile from "./tile";

class Entity extends Tile {
    constructor(x, y, tileClass, attributes) {
        super(x, y, tileClass);
        this.attributes = {...attributes};
    }
}

export default Entity