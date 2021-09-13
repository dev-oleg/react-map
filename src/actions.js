import {
    CREATE_REQUEST_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR
} from './actionTypes'

import axios from 'axios'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export function nominatimRequest(inputText, cancelTokenSource) {
    return async dispatch => {
        dispatch(createRequestData(inputText, cancelTokenSource))

        try {
            const response = await axios.get(baseURL, {
                params: {
                    q: inputText,
                    polygon_geojson: 1,
                    limit: 10,
                    format: 'json'
                },
                cancelToken: cancelTokenSource.token
            })

            dispatch(fetchDataSuccess(response.data))
        } catch(error) {
            dispatch(fetchDataError(error))
        }
    }
}

export function createRequestData(inputText, cancelTokenSource) {
    return {
        type: CREATE_REQUEST_DATA,
        payload: inputText,
        token: cancelTokenSource
    }
}

function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

function fetchDataError(error) {
    return {
        type: FETCH_DATA_ERROR,
        payload: error
    }
}