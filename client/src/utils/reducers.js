import Entity from '../game/entity';
import Map from '../game/map';
import Tile from '../game/tile';
import {CREATE_MAP, UPDATE_MAP, ADD_ENTITY, MOVE} from './actions'

const initialState = {
    map: new Map(50,50),
    entities: {}
}

function reducer(state = initialState, action) {
    switch(action.type){
        case CREATE_MAP:
            state.map.createMap()
            return state;
        case UPDATE_MAP: 
            return {
                ...state,
                map: action.payload
            }
        case ADD_ENTITY:
            {let updatedMap = state.map;
            const newEntity = new Entity(
                action.payload.x,
                action.payload.y,
                action.payload.tileClass,
                action.payload.entityName,
                action.payload.attributes);
            updatedMap.map[action.payload.x][action.payload.y] = newEntity;
            const newEntities = {
                ...state.entities,
                    [action.payload.entityName]: newEntity
            }
            state.entities = newEntities;
            return {
                ...state,
                map: updatedMap
            }}
        case MOVE: 
            console.log(action);
            let updatedMap = state.map;
            let entity = action.payload.entity;
            console.log(entity);
            const newCoords = {
                x: entity.x + action.payload.vector.x,
                y: entity.y + action.payload.vector.y
            }
            console.log(newCoords);
            updatedMap.map[entity.x][entity.y] = new Tile(entity.x, entity.y, 'floor')
            updatedMap.map[newCoords.x][newCoords.y] = entity;
            state.entities[entity.entityName].x = newCoords.x;
            state.entities[entity.entityName].y = newCoords.y;

            return {
                ...state
            }
        default:
            return state
    }
}

export default reducer