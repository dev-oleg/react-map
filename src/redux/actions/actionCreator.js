import {
    FETCH_NOMINATIM_INIT,
    FETCH_NOMINATIM_SUCCESS,
    CLEAR,
    ACTIVE_ELEMENT
} from './actionTypes'

import axios from 'axios'



const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export function fetchNominatim(text, token) {
    return async (dispatch) => {
        dispatch(fetchNominatimInit(token))

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

            const data = response.data.map((item) => {
                return {
                    name: item.display_name,
                    geojson: item.geojson,
                    lat: item.lat,
                    lon: item.lon
                }
            })

            dispatch(fetchNominatimSuccess(data))
        } catch(error) {
            console.log(error)
        }
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
