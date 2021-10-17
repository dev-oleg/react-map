import {
    FETCH_NOMINATIM_START,
    FETCH_NOMINATIM_FINISH,
    FETCH_NOMINATIM_ERROR,
    CLEAR,
    ACTIVE_ELEMENT
} from '../actions/actionTypes'

export default function(state, action) {
    switch (action.type) {
        case FETCH_NOMINATIM_START:
            return {
                ...state,
                loading: true,
                activeElement: null,
                cancelTokenSource: action.token
            }
        case FETCH_NOMINATIM_FINISH:
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