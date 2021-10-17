import React, {useEffect, useRef, useContext} from 'react'
import './Map.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {config} from './map.config'
import {clearLayers, addLayer, setView, autoZoom} from './map.functions'
import {Context} from '../../context'

L.Icon.Default.imagePath = 'assets/'

function Map() {
    const mapSave = useRef(null)
    const tileLayerSave = useRef(null)

    const {results, activeElement} = useContext(Context)

    useEffect(() => {
        const map = L.map(config.id, config.params)
        const tileLayer = L.tileLayer(config.tileLayer.uri)

        mapSave.current = map
        tileLayerSave.current = tileLayer

        tileLayer.addTo(map)
    }, [])

    useEffect(() => {
        let data = null

        if (activeElement || activeElement === 0) {
            data = results[activeElement]
        }

        clearLayers(mapSave.current, tileLayerSave.current)

        if (!data) return

        const {geojson, lat, lon} = data

        const geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": geojson.type,
                "coordinates": geojson.coordinates
            }
        }

        const {
            _northEast: northEast,
            _southWest: southWest
        } = addLayer(mapSave.current, geojsonFeature)

        setView(mapSave.current, lat, lon)

        autoZoom(mapSave.current, northEast, southWest)
    }, [results, activeElement])

    return (
        <div id = 'map'></div>
    )
}

export default Map
