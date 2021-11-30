import L, { Map, Layer, LatLngLiteral, FeatureGroup } from 'leaflet'
import { GeoJsonObject } from 'geojson'

export function clearLayers(map: Map, tileLayer: Layer) {
    map.eachLayer((layer: Layer | FeatureGroup) => {
        if (layer !== tileLayer) {
            map.removeLayer(layer)
        }
    })
}

export function addLayer(map: Map, geodata: GeoJsonObject) {
    const layer: FeatureGroup = L.geoJSON(geodata)
    layer.addTo(map)
    return layer.getBounds()
}

export function setView(map: Map, lat: number, lon: number) {
    map.panTo([lat, lon])
}

export function autoZoom(map: Map, ne: LatLngLiteral, sw: LatLngLiteral) {
    map.fitBounds([
        [ne.lat, ne.lng],
        [sw.lat, sw.lng]
    ])
}