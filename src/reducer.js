import {
    CREATE_REQUEST_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
    SET_MAP,
    CLEAR_STATE
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
        case SET_MAP:
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
        default:
            return state
    }
}