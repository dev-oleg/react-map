import {CancelTokenSource} from 'axios'

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

export interface IRootState {
    loading: boolean
    results: TResults
    activeElement: TActiveElement
    cancelTokenSource: TCancelTokenSource
}

export interface IFetchNominatimInit {
    type: string
    token: CancelTokenSource
}

export interface IFetchNominatimSuccess {
    type: string
    payload: TResults
}

export interface IClearAction {
    type: string
}

export interface ISetActiveElementAction {
    type: string
    payload: number
}

export type Action =
    | IFetchNominatimInit
    | IFetchNominatimSuccess
    | IClearAction
    | ISetActiveElementAction