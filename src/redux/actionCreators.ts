import { actionTypes } from './actionTypes'
import { Dispatch } from 'redux'
import { Action, TCancelTokenSource, TResults } from './types'
import axios from 'axios'



const baseURL: string = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export const fetchNominatim = (text: string, token: TCancelTokenSource) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: actionTypes.FETCH_NOMINATIM_INIT,
            token
        })

        try {
            const response: any = await axios.get(baseURL, {
                params: {
                    q: text,
                    polygon_geojson: 1,
                    limit: 30,
                    format: 'json'
                },
                cancelToken: token.token
            })

            const data: TResults = response.data.map((item: any) => (
                {
                    name: item.display_name,
                    geojson: item.geojson,
                    lat: item.lat,
                    lon: item.lon
                }
            ))

            dispatch({
                type: actionTypes.FETCH_NOMINATIM_SUCCESS,
                payload: data
            })
        } catch(error: any) {
            console.log(error)
        }
    }
}

export const clearAction = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: actionTypes.CLEAR
        })
    }
}

export const setActiveElementAction = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: actionTypes.ACTIVE_ELEMENT,
            payload: id
        })
    }
}
