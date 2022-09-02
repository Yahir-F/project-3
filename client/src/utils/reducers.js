import Entity from '../game/entity';
import Map from '../game/map';
import Tile from '../game/tile';
import { CREATE_MAP, UPDATE_MAP, RESET_STATE ,ADD_ENTITY, REMOVE_ENTITY, MOVE, HEAL, DAMAGE, GAIN_XP } from './actions';
import _ from 'lodash';

const initialState = {
    map: new Map(50, 50),
    entities: {
        player: {
            x: 0,
            y: 0,
            tileClass: 'player',
            entityName: 'player',
            attributes: {
                health: 1,
                xp: 0,
                level: 0,
                damage: 0,
                /* insert more attributes */
            }
        }
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_MAP:
            state.map.createMap();
            return state;
        case UPDATE_MAP:
            return {
                ...state,
                map: action.payload
            };
        case RESET_STATE:
            return initialState;
        case ADD_ENTITY: {
            let updatedMap = state.map;
            const newEntity = new Entity(
                action.payload.x,
                action.payload.y,
                action.payload.tileClass,
                action.payload.entityName,
                action.payload.attributes);
            updatedMap.map[action.payload.x][action.payload.y] = newEntity;
            _.omit(updatedMap.freeTiles, `${action.payload.x}x${action.payload.y}`);
            _.set(state.entities, action.payload.entityName, newEntity);
            return {
                ...state,
                map: updatedMap
            };
        }
        case REMOVE_ENTITY: {
            delete state.entities[action.payload.entityName]
            return state
        }
        case MOVE: {
            //console.log(action);
            let updatedMap = state.map;
            let entity = action.payload.entity;
            //console.log(entity);
            const newCoords = {
                x: entity.x + action.payload.vector.x,
                y: entity.y + action.payload.vector.y
            };
            //console.log(newCoords);
            updatedMap.map[entity.x][entity.y] = new Tile(entity.x, entity.y, 'floor');
            updatedMap.map[newCoords.x][newCoords.y] = entity;
            state.entities[entity.entityName].x = newCoords.x;
            state.entities[entity.entityName].y = newCoords.y;

            _.chain(updatedMap.freeTiles)
                .omit(`${entity.x}x${entity.y}`)
                .set(`${newCoords.x}x${newCoords.y}`, entity);

            return {
                ...state,
                map: updatedMap
            };
        }
        case HEAL: {
            state.entities.player.attributes.health += action.payload.healValue
            return state;
        }
        case DAMAGE: {
            state.entities[action.payload.entityName].attributes.health -= action.payload.dmgValue
            return state;
        }
        case GAIN_XP: {
            state.entities.player.attributes.xp += action.payload.value;
            return state;
        }
        default:
            return state;
    }
}

export default reducer;