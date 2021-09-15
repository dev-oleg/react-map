import {SET_MAP} from './actionTypes'

export function setMap({map, tileLayer}) {
    return {
        type: SET_MAP,
        map,
        tileLayer
    }
}