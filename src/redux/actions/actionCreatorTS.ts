import {
    FETCH_NOMINATIM_INIT,
    FETCH_NOMINATIM_SUCCESS,
    CLEAR,
    ACTIVE_ELEMENT
} from './actionTypesTS'

import {
    TResults, 
    TCancelTokenSource, 
    IFetchNominatimInit, 
    IFetchNominatimSuccess,
    IClearAction,
    ISetActiveElementAction
} from '../../types'

import axios from 'axios'



const baseURL: string = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

export const fetchNominatim = (text: string, token: TCancelTokenSource) => {
    return async (dispatch: any) => {
        dispatch(fetchNominatimInit(token))

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

            dispatch(fetchNominatimSuccess(data))
        } catch(error: any) {
            console.log(error)
        }
    }
}

export function fetchNominatimInit(token: TCancelTokenSource): IFetchNominatimInit {
    return {
        type: FETCH_NOMINATIM_INIT,
        token
    }
}

export function fetchNominatimSuccess(data: TResults): IFetchNominatimSuccess {
    return {
        type: FETCH_NOMINATIM_SUCCESS,
        payload: data
    }
}

export function clearAction(): IClearAction {
    return {
        type: CLEAR
    }
}

export function setActiveElementAction(id: number): ISetActiveElementAction {
    return {
        type: ACTIVE_ELEMENT,
        payload: id
    }
}
