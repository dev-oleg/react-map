import { CancelTokenSource } from 'axios'
import { actionTypes } from './actionTypes'

export type TCoordinate = [number, number]
export type TCoordinates = TCoordinate | TCoordinate[]

export interface IResult {
    name: string
    lat: string
    lon: string
    geojson: {
        type: string
        coordinates: TCoordinates
    }
}

export type TResults = IResult[] | IResult | null
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