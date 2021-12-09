import { CancelTokenSource } from 'axios'
import { actionTypes } from './actionTypes'
import { GeoJsonObject, BBox } from 'geojson'

export type TCoordinate = [number, number]

export class IResult {
    name: string
    lat: string
    lon: string
    geojson: {
        type: GeoJsonObject["type"]
        coordinates: BBox
    }
}

export type TResults = IResult[] | null
export type TActiveElement = number | null
export type TCancelTokenSource = CancelTokenSource | null

export interface IState {
    loading: boolean
    results: TResults
    activeElement: TActiveElement
    cancelTokenSource: TCancelTokenSource
}

export interface IFetchNominatimInit {
    type: actionTypes.FETCH_NOMINATIM_INIT
    token: CancelTokenSource
}

export interface IFetchNominatimSuccess {
    type: actionTypes.FETCH_NOMINATIM_SUCCESS
    payload: TResults
}

export interface IClearAction {
    type: actionTypes.CLEAR
}

export interface ISetActiveElementAction {
    type: actionTypes.ACTIVE_ELEMENT
    payload: number
}

export type Action = 
    | IFetchNominatimInit
    | IFetchNominatimSuccess
    | IClearAction
    | ISetActiveElementAction