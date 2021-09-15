import {SET_MAP} from '../actions/actionTypes'

const initialState = {
    map: null,
    tileLayer: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                map: action.map,
                tileLayer: action.tileLayer
            }
        default: 
            return state
    }
}