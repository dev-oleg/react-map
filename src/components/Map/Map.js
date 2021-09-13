import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setMap} from '../../actions'
import './Map.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {config} from './map.config'
import {clearLayers, addLayer, setView, autoZoom} from './map.functions'

L.Icon.Default.imagePath = 'assets/'

class Map extends Component {
    componentDidMount() {
        if (this.props.map) return

        const map = L.map(config.id, config.params)
        const tileLayer = L.tileLayer(config.tileLayer.uri).addTo(map)

        this.props.setMap(map, tileLayer)
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.data && !this.props.data) {
            return false
        }

        if (nextProps.data === this.props.data) {
            return false
        }

        return true
    }
    
    componentDidUpdate() {
        const {map, tileLayer} = this.props

        clearLayers(map, tileLayer)

        if (!this.props.data) {
            return
        }

        const {geojson, lat, lon} = this.props.data

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
        } = addLayer(map, geojsonFeature)

        setView(map, lat, lon)

        autoZoom(map, northEast, southWest)
    }

    render() {
        return (
            <div id = 'map'></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        map: state.map,
        tileLayer: state.tileLayer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setMap: (map, tileLayer) => dispatch(setMap(map, tileLayer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
