import {
    CREATE_REQUEST_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR
} from './actionTypes'

const initialState = {
    lastSearch: '',
    loading: false,
    results: null,
    activeElement: null,
    cancelTokenSource: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_REQUEST_DATA:
            return {
                ...state,
                lastSearch: action.payload,
                loading: true,
                activeElement: null,
                cancelTokenSource: action.token
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                cancelTokenSource: null,
                results: action.payload
            }
        case FETCH_DATA_ERROR:
            return {
                ...state,
                loading: false,
                cancelTokenSource: null,
                error: action.payload
            }
        default:
            return state
    }
}