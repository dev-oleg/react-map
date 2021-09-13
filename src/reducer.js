import {
    FETCH_START,
    FETCH_FINISH,
    SET_MAP_ELEMENT,
    CLEAR_STATE,
    SET_MAP
} from './actionTypes'

const initialState = {
    lastSearch: '',
    loading: false,
    results: null,
    activeElement: null,
    cancelTokenSource: null,
    map: null,
    tileLayer: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                lastSearch: action.payload,
                loading: true,
                activeElement: null,
                cancelTokenSource: action.token
            }
        case FETCH_FINISH:
            return {
                ...state,
                loading: false,
                cancelTokenSource: null,
                results: action.payload
            }
        case SET_MAP_ELEMENT:
            return {
                ...state,
                activeElement: action.payload
            }
        case CLEAR_STATE:
            return {
                ...state,
                lastSearch: '',
                loading: false,
                results: null,
                activeElement: null,
                cancelTokenSource: null
            }
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