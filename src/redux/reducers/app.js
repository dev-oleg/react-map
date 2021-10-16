import {
    FETCH_NOMINATIM_START,
    FETCH_NOMINATIM_FINISH,
    CLEAR,
    ACTIVE_ELEMENT
} from '../actions/actionTypes'

const initialState = {
    lastSearch: '',
    loading: false,
    results: null,
    activeElement: null,
    cancelTokenSource: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_NOMINATIM_START:
            return {
                ...state,
                lastSearch: action.payload,
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
        case CLEAR:
            return {
                ...state,
                lastSearch: '',
                loading: false,
                results: null,
                activeElement: null,
                cancelTokenSource: null
            }
        case ACTIVE_ELEMENT:
            return {
                ...state,
                // activeElement: action.payload
                activeElement: state.activeElement === action.payload ? null : action.payload
            }
        default:
            return state
    }
}