import L, { Map, Layer, SVGOverlay, LatLngLiteral } from 'leaflet'

export function clearLayers(map: Map, tileLayer) {
    map.eachLayer(layer => {
        if (layer !== tileLayer) {
            map.removeLayer(layer)
        }
    })
}

export function addLayer(map: Map, geodata) {
    const layer: Layer = L.geoJSON(geodata)
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