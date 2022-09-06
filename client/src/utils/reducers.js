import Entity from '../game/entity';
import Map from '../game/map';
import Tile from '../game/tile';
import { CREATE_MAP, UPDATE_MAP, RESET_STATE, INCREASE_FLOOR ,ADD_ENTITY, REMOVE_ENTITY, MOVE, HEAL, DAMAGE, GAIN_XP, LOAD_STATE, LEVEL_UP, GAIN_COINS, GAIN_STATS, SPEND_COINS, ADD_TO_LOG } from './actions';
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
                coins: 100,
                bonusDamage: 0,
                bonusArmor: 0
            }
        }
    },
    floor: 1,
    history: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STATE: 
            // copy payload to state
            _.assign(state, action.payload.state)
            // reconstruct map functionality
            state.map = Map.constructMap(state.map);
            // reconstruct entity functionality
            for(let key in state.entities) {
                let tempEntity = {...state.entities[key]}
                state.entities[key] = new Entity(tempEntity.x, tempEntity.y, tempEntity.tileClass, tempEntity.entityName, tempEntity.attributes);
            }
            return state;
        case CREATE_MAP:
            // Create a new map
            state.map = new Map(action.payload.width, action.payload.height);
            state.map.createMap();
            return state;
        case UPDATE_MAP:
            // update map with the payload
            return {
                ...state,
                map: action.payload
            };
        case RESET_STATE:
            // reset state to initial state
            return initialState;
        case ADD_ENTITY: {
            // create a new entity from payload
            let updatedMap = state.map;
            const newEntity = new Entity(
                action.payload.x,
                action.payload.y,
                action.payload.tileClass,
                action.payload.entityName,
                action.payload.attributes);
            // add the entity to the map
            updatedMap.map[action.payload.x][action.payload.y] = newEntity;
            // update free tiles tracker
            _.omit(updatedMap.freeTiles, `${action.payload.x}x${action.payload.y}`);
            // add entity to entity tracker
            _.set(state.entities, action.payload.entityName, newEntity);
            return {
                ...state,
                map: updatedMap
            };
        }
        case REMOVE_ENTITY: {
            // delete entity from entity tracker
            delete state.entities[action.payload.entityName]
            return state
        }
        case MOVE: {
            let updatedMap = state.map;
            let entity = action.payload.entity;
            // calculate new coords
            const newCoords = {
                x: entity.x + action.payload.vector.x,
                y: entity.y + action.payload.vector.y
            };
            // replace old coords in map with floor tile
            updatedMap.map[entity.x][entity.y] = new Tile(entity.x, entity.y, 'floor');
            // set new coords in map to the entity
            updatedMap.map[newCoords.x][newCoords.y] = entity;
            // update the coords of the entity
            state.entities[entity.entityName].x = newCoords.x;
            state.entities[entity.entityName].y = newCoords.y;
            // update the record of free tiles on the map
            _.chain(updatedMap.freeTiles)
                .omit(`${entity.x}x${entity.y}`)
                .set(`${newCoords.x}x${newCoords.y}`, entity);
            return {
                ...state,
                map: updatedMap
            };
        }
        case HEAL: {
            // increment player's health
            state.entities.player.attributes.health += action.payload.healValue
            return state;
        }
        case DAMAGE: {
            // decrement entity's health
            const entity = state.entities[action.payload.entityName];
            entity.attributes.health -= action.payload.dmgValue;
            return state;
        }
        case GAIN_XP: {
            // increment player's xp
            state.entities.player.attributes.xp += action.payload.value;
            return state;
        }
        case LEVEL_UP: {
            // update level and stats to match with current xp value
            const currLevel = action.payload.level(state.entities.player.attributes.xp);
            const newDamage = action.payload.stats(50, currLevel);
            state.entities.player.attributes.level = currLevel;
            state.entities.player.attributes.damage = newDamage;
            return state;
        }
        case GAIN_COINS: {
            // increment player's coins
            state.entities.player.attributes.coins += action.payload.coins;
            return state;
        }
        case SPEND_COINS: {
            // decrement player's coins
            state.entities.player.attributes.coins -= action.payload.coins;
            return state;
        }
        case GAIN_STATS: {
            // increment player's bonus stats 
            switch(action.payload.stat) {
                case 'damage':
                    state.entities.player.attributes.bonusDamage += action.payload.value;
                    return state;
                case 'armor': 
                    state.entities.player.attributes.bonusArmor += action.payload.value;
                    return state;
                default:
                    return state;
            }
        }
        case INCREASE_FLOOR: {
            // increment floor number
            state.floor += 1;
            return state;
        }
        case ADD_TO_LOG: {
            // add log message to beginning of history array
            state.history.unshift(action.payload.msg);
            return state;
        }
        default:
            return state;
    }
}

export default reducer;