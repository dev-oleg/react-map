import { IState, Action } from './types'
import { actionTypes } from './actionTypes'



const initialState: IState = {
    loading: false,
    results: null,
    activeElement: null,
    cancelTokenSource: null
}

const reducer = (state: IState = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.FETCH_NOMINATIM_INIT:
            return {
                ...state,
                loading: true,
                activeElement: null,
                cancelTokenSource: action.token
            }
        case actionTypes.FETCH_NOMINATIM_SUCCESS:
            return {
                ...state,
                loading: false,
                results: action.payload,
                cancelTokenSource: null
            }
        case actionTypes.CLEAR:
            return {
                ...state,
                loading: false,
                results: null,
                activeElement: null,
                cancelTokenSource: null
            }
        case actionTypes.ACTIVE_ELEMENT:
            return {
                ...state,
                activeElement: state.activeElement === action.payload ? null : action.payload
            }
        default:
            return state
    }
}

export default reducer
export type State = ReturnType<typeof reducer>
