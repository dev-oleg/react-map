interface TConfig {
    id: string
    tileLayer: {
        uri: string
    }
    params: {
        center: [number, number]
        zoom: number
    }
}

export const config: TConfig = {
    id: 'map',
    params: {
        center: [51.505, -0.09],
        zoom: 10
    },
    tileLayer: {
        uri: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
}