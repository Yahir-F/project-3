import Tile from "./tile";

class Entity extends Tile {
    constructor(x, y, tileClass, entityName, attributes) {
        super(x, y, tileClass);
        this.entityName = entityName;
        this.attributes = {...attributes};
    }
}

export default Entity