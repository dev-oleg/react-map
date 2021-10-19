import {
    FETCH_NOMINATIM_INIT,
    FETCH_NOMINATIM_SUCCESS,
    FETCH_NOMINATIM_ERROR,
    CLEAR,
    ACTIVE_ELEMENT
} from '../actions/actionTypes'

export function reducer(state, action) {
    switch (action.type) {
        case FETCH_NOMINATIM_INIT:
            return {
                ...state,
                loading: true,
                activeElement: null,
                cancelTokenSource: action.token
            }
        case FETCH_NOMINATIM_SUCCESS:
            return {
                ...state,
                loading: false,
                results: action.payload,
                cancelTokenSource: null
            }
        case FETCH_NOMINATIM_ERROR:
            return {
                ...state,
                loading: false,
                cancelTokenSource: null
            }
        case CLEAR:
            return {
                ...state,
                loading: false,
                results: null,
                activeElement: null,
                cancelTokenSource: null
            }
        case ACTIVE_ELEMENT:
            return {
                ...state,
                activeElement: state.activeElement === action.payload ? null : action.payload
            }
        default:
            return state
    }
}