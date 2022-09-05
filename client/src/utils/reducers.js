import Entity from '../game/entity';
import Map from '../game/map';
import Tile from '../game/tile';
import { CREATE_MAP, UPDATE_MAP, RESET_STATE, INCREASE_FLOOR ,ADD_ENTITY, REMOVE_ENTITY, MOVE, HEAL, DAMAGE, GAIN_XP, LOAD_STATE, LEVEL_UP } from './actions';
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
                health: 100,
                xp: 0,
                level: 1,
                damage: 4,
                /* insert more attributes */
            }
        }
    },
    floor: 1
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STATE: 
            _.assign(state, action.payload.state)
            state.map = Map.constructMap(state.map);
            for(let key in state.entities) {
                let tempEntity = {...state.entities[key]}
                state.entities[key] = new Entity(tempEntity.x, tempEntity.y, tempEntity.tileClass, tempEntity.entityName, tempEntity.attributes);
            }
            return state;
        case CREATE_MAP:
            state.map = new Map(action.payload.width, action.payload.height);
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
        case LEVEL_UP: {
            console.log(state);
            const currLevel = action.payload.level(state.entities.player.attributes.xp);
            const newDamage = action.payload.stats(50, currLevel);
            state.entities.player.attributes.level = currLevel;
            state.entities.player.attributes.damage = newDamage;
            return state;
        }
        case INCREASE_FLOOR: {
            state.floor += 1;
            return state;
        }
        default:
            return state;
    }
}

export default reducer;