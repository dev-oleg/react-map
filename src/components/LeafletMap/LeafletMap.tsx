import React, { useEffect, useRef, useContext } from 'react'
import './Map.css'
import L, { Map, Layer, TileLayer, LatLngLiteral } from 'leaflet'
import { GeoJsonObject } from 'geojson'
import 'leaflet/dist/leaflet.css'
import { config } from './map.configTS'
import { clearLayers, addLayer, setView, autoZoom } from './map.functionsTS'
import { Context } from '../../context'
import { IResult } from '../../redux/types'

L.Icon.Default.imagePath = 'assets/'

function LeafletMap() {
    const mapSave = useRef<Map>(null)
    const tileLayerSave = useRef<TileLayer>(null)

    const {results, activeElement} = useContext(Context)

    useEffect(() => {
        const map: Map = L.map(config.id, config.params)
        const tileLayer: TileLayer = L.tileLayer(config.tileLayer.uri)

        mapSave.current = map
        tileLayerSave.current = tileLayer

        tileLayer.addTo(map)
    }, [])

    useEffect(() => {
        type TData = IResult | null
        let data: TData = null

        if (activeElement || activeElement === 0) {
            data = results[activeElement]
        }

        clearLayers(mapSave.current, tileLayerSave.current)

        if (!data) return

        const {geojson, lat, lon} = data

        // const geojsonFeature = {
        //     type: 'Feature',
        //     geometry: {
        //         type: geojson.type,
        //         coordinates: geojson.coordinates
        //     }
        // }

        const geojsonFeature: GeoJsonObject = {
            type: geojson.type,
            bbox: geojson.coordinates
        }

        // const {
        //     _northEast: northEast,
        //     _southWest: southWest
        // } = addLayer(mapSave.current, geojsonFeature)

        // type Tnesw = {
        //     _northEast: LatLngLiteral,
        //     _southWest: LatLngLiteral
        // }

        const nesw: any = addLayer(mapSave.current, geojsonFeature)
        // console.log(nesw)
        
        // const northEast: LatLngLiteral = nesw._northEast
        // const southWest: LatLngLiteral = nesw._southWest

        setView(mapSave.current, +lat, +lon)

        // autoZoom(mapSave.current, northEast, southWest)
    }, [results, activeElement])

    return (
        <div id = 'map'></div>
    )
}

export default LeafletMap
