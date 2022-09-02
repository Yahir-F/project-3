import Map from '../game/map';
import {MOVE} from './actions'

const initialState = {
    map: new Map(50,50,10)
}

function reducer(state = initialState, action) {
    switch(action.type){
        case MOVE: 
            return state
        default:
            return state
    }
}

export default reducer