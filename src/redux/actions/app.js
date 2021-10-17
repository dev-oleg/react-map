import {
    FETCH_NOMINATIM_START,
    FETCH_NOMINATIM_FINISH,
    CLEAR,
    ACTIVE_ELEMENT
} from './actionTypes'

import axios from 'axios'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export async function fetchNominatim(text, token) {
    console.log(`fetchNominatim - text: ${text}, token: ${token}`)
    // dispatch(fetchNominatimStart(text, token))

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

    if (error) console.log(error)

    return {
        type: FETCH_NOMINATIM_FINISH,
        payload: data
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
