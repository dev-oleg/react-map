import {FETCH_NOMINATIM_START, FETCH_NOMINATIM_FINISH} from '../actions/actionTypes'

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
        default:
            return state
    }
}