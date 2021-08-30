import React, {Component} from 'react'
import './Map.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {config} from './map.config'

class Map extends Component {
    state = {
        map: null,
        tileLayer: null
    }

    componentDidMount() {
        if (this.state.map) return

        const map = L.map(config.id, config.params)
        const tileLayer = L.tileLayer(config.tileLayer.uri).addTo(map)

        this.setState({map, tileLayer})
    }

    render() {
        return (
            <div id = 'map'></div>
        )
    }
}

export default Map
