import {FETCH_NOMINATIM_START, FETCH_NOMINATIM_FINISH} from './actionTypes'

import axios from 'axios'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export function fetchNominatim(text, token) {
    return async dispatch => {
        dispatch(fetchNominatimStart(text, token))

        try {
            const response = await axios.get(baseURL, {
                params: {
                    q: text,
                    polygon_geojson: 1,
                    limit: 30,
                    format: 'json'
                },
                cancelToken: token.token
            })

            dispatch(fetchNominatimFinish(response.data))
        } catch(error) {
            dispatch(fetchNominatimFinish(error))
        }
    }
}

export function fetchNominatimStart(text, token) {
    return {
        type: FETCH_NOMINATIM_START,
        payload: text,
        token
    }
}

export function fetchNominatimFinish(data) {
    return {
        type: FETCH_NOMINATIM_FINISH,
        payload: data
    }
}