import {
    FETCH_NOMINATIM_START,
    FETCH_NOMINATIM_FINISH,
    CLEAR,
    ACTIVE_ELEMENT
} from './actionTypes'

import axios from 'axios'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

// export function fetchNominatim(text, token) {
export function fetchNominatim(text) {
    console.log('fetchNominatim')
    return async dispatch => {
        // dispatch(fetchNominatimStart(text, token))
        dispatch(fetchNominatimStart(text))

        try {
            const response = await axios.get(baseURL, {
                params: {
                    q: text,
                    polygon_geojson: 1,
                    limit: 30,
                    format: 'json'
                },
                // cancelToken: token.token
            })

            console.log(response.data)

            dispatch(fetchNominatimFinish(response.data, null))
        } catch(error) {
            console.log(error)
            dispatch(fetchNominatimFinish(null, error))
        }
    }
}

export function fetchNominatimStart(text, token) {
    console.log('fetchNominatimStart')
    return {
        type: FETCH_NOMINATIM_START,
        payload: text,
        token
    }
}

export function fetchNominatimFinish(data, error) {
    console.log('fetchNominatimFinish')
    return {
        type: FETCH_NOMINATIM_FINISH,
        payload: data
    }
}

export function clear() {
    return {
        type: CLEAR
    }
}

export function setActiveElement(id) {
    return {
        type: ACTIVE_ELEMENT,
        payload: id
    }
}
