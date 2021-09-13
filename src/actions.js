import {
    FETCH_START,
    FETCH_FINISH,
    SET_MAP_ELEMENT,
    CLEAR_STATE,
    SET_MAP
} from './actionTypes'

import axios from 'axios'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export function getMapData(value, token) {
    return async dispatch => {
        dispatch(fetchStart(value, token))

        try {
            const response = await axios.get(baseURL, {
                params: {
                    q: value,
                    polygon_geojson: 1,
                    limit: 30,
                    format: 'json'
                },
                cancelToken: token.token
            })

            dispatch(fetchFinish(response.data))
        } catch(error) {
            dispatch(fetchFinish(error))
        }
    }
}

export function fetchStart(value, token) {
    return {
        type: FETCH_START,
        payload: value,
        token
    }
}

export function fetchFinish(data) {
    return {
        type: FETCH_FINISH,
        payload: data
    }
}

export function setMapElement(id) {
    return {
        type: SET_MAP_ELEMENT,
        payload: id
    }
}

export function clearState() {
    return {
        type: CLEAR_STATE
    }
}

export function setMap(map, tileLayer) {
    return {
        type: SET_MAP,
        map,
        tileLayer
    }
}