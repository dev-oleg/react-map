import React, {Component} from 'react'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'
import axios from 'axios'

class App extends Component {
    state = {
        inputText: '',
        inputValid: false,
        showErrorMessage: false,
        lastSearch: '',
        results: null
    }

    baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'

    changeHandler = event => {
        const inputText = event.target.value.trim()

        this.setState({
            inputText,
            inputValid: !!inputText,
            showErrorMessage: false
        })
    }

    searchHandler = async event => {
        event.preventDefault()

        if (!this.state.inputValid) {
            this.setState({showErrorMessage: true})

            return
        }

        const {inputText, lastSearch} = this.state

        if (inputText === lastSearch) return

        this.setState({lastSearch: inputText})

        try {
            const response = await axios.get(this.baseURL, {
                params: {
                    q: inputText,
                    polygon_geojson: 1,
                    limit: 10,
                    format: 'json'
                }
            })

            this.setState({
                results: response.data
            })

            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    clearHandler = event => {
        event.preventDefault()

        this.setState({
            inputText: '',
            inputValid: false,
            showErrorMessage: false,
            lastSearch: ''
        })
    }

    submitHandler = event => {
        event.preventDefault()

        this.searchHandler(event)
    }

    render() {
        return (
            <div className = 'App'>
                <Map />

                <Widget
                    inputText = {this.state.inputText}
                    showErrorMessage = {this.state.showErrorMessage}
                    onChange = {this.changeHandler}
                    onSearch = {this.searchHandler}
                    onClear = {this.clearHandler}
                    onSubmit = {this.submitHandler}
                />
            </div>
        )
    }
}

export default App
