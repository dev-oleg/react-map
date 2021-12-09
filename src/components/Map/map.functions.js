export function clearLayers(map, tileLayer) {
    map.eachLayer(layer => {
        if (layer !== tileLayer) {
            map.removeLayer(layer)
        }
    })
}

export function addLayer(map, geodata) {
    const layer = L.geoJSON(geodata)
    layer.addTo(map)
    return layer.getBounds()
}

export function setView(map, lat, lon) {
    map.panTo([lat, lon])
}

export function autoZoom(map, ne, sw) {
    map.fitBounds([
        [ne.lat, ne.lng],
        [sw.lat, sw.lng]
    ])
}