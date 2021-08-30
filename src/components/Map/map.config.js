export const config = {
    id: 'map',
    params: {
        center: [51.505, -0.09],
        zoom: 10
    },
    tileLayer: {
        uri: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
}