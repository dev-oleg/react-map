import {FETCH_NOMINATIM} from '../actions/actionTypes'
import {fetchNominatimSuccess, fetchNominatimError} from '../actions/actionCreator'
import axios from 'axios'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export function dispatchMiddleware(dispatch) {
    return async (action) => {
        switch (action.type) {
            case FETCH_NOMINATIM:
                try {
                    const response = await axios.get(baseURL, {
                        params: {
                            q: action.text,
                            polygon_geojson: 1,
                            limit: 30,
                            format: 'json'
                        },
                        cancelToken: action.token.token
                    })

                    dispatch(fetchNominatimSuccess(response.data))
                } catch(error) {
                    dispatch(fetchNominatimError(error))
                }
                break

            default: dispatch(action)
        }
    }
}