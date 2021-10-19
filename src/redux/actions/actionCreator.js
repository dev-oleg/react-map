import {
    FETCH_NOMINATIM,
    FETCH_NOMINATIM_INIT,
    FETCH_NOMINATIM_SUCCESS,
    FETCH_NOMINATIM_ERROR,
    CLEAR,
    ACTIVE_ELEMENT
} from './actionTypes'

export function fetchNominatim(text, token) {
    return {
        type: FETCH_NOMINATIM,
        text,
        token
    }
}

export function fetchNominatimInit(token) { 
    return {
        type: FETCH_NOMINATIM_INIT,
        token
    }
}

export function fetchNominatimSuccess(data) {
    return {
        type: FETCH_NOMINATIM_SUCCESS,
        payload: data
    }
}

export function fetchNominatimError(error) {
    console.log(error)

    return {
        type: FETCH_NOMINATIM_ERROR
    }
}

export function clearAction() {
    return {
        type: CLEAR
    }
}

export function setActiveElementAction(id) {
    return {
        type: ACTIVE_ELEMENT,
        payload: id
    }
}
