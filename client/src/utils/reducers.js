import Entity from '../game/entity';
import Map from '../game/map';
import {CREATE_MAP, UPDATE_MAP, ADD_ENTITY} from './actions'

const initialState = {
    map: new Map(50,50,10)
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
            let updatedMap = state.map;
            const newEntity = new Entity(
                action.payload.x,
                action.payload.y,
                action.payload.tileClass,
                action.payload.attributes);
            updatedMap.map[action.payload.x][action.payload.y] = newEntity;
            return {
                ...state,
                map: updatedMap
            }
        default:
            return state
    }
}

export default reducer