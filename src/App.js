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
        loading: false,
        results: null,
        cancelTokenSource: null
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


        if (this.state.cancelTokenSource) {
            this.state.cancelTokenSource.cancel()
            console.log('aborted')
        }

        const cancelTokenSource = axios.CancelToken.source()

        this.setState({
            lastSearch: inputText,
            loading: true,
            cancelTokenSource
        })

        try {
            const response = await axios.get(this.baseURL, {
                params: {
                    q: inputText,
                    polygon_geojson: 1,
                    limit: 10,
                    format: 'json'
                },
                cancelToken: cancelTokenSource.token
            })

            this.setState({
                loading: false,
                results: response.data,
                cancelTokenSource: null
            })

            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    clearHandler = event => {
        event.preventDefault()

        if (this.state.cancelTokenSource) {
            this.state.cancelTokenSource.cancel()
            console.log('aborted')
        }

        this.setState({
            inputText: '',
            inputValid: false,
            showErrorMessage: false,
            lastSearch: '',
            loading: false,
            results: null,
            cancelTokenSource: null
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
                    loading = {this.state.loading}
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
