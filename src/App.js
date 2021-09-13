import React, {Component} from 'react'
import {connect} from 'react-redux'
import {nominatimRequest, setMap, clearState} from './actions'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'
import axios from 'axios'

class App extends Component {
    state = {
        inputText: '',
        inputValid: false,
        showErrorMessage: false
    }

    changeHandler = event => {
        const inputText = event.target.value

        this.setState({
            inputText,
            inputValid: !!inputText.trim(),
            showErrorMessage: false
        })
    }

    searchHandler = event => {
        event.preventDefault()
        
        if (!this.state.inputValid) {
            this.setState({showErrorMessage: true})
            return
        }

        const {inputText} = this.state
        const {lastSearch} = this.props
        if (inputText === lastSearch) return

        if (this.props.cancelTokenSource) {
            this.props.cancelTokenSource.cancel()
            console.log('aborted')
        }

        const cancelTokenSource = axios.CancelToken.source()

        this.props.nominatimRequest(inputText, cancelTokenSource)
    }

    clearHandler = event => {
        event.preventDefault()

        if (this.props.cancelTokenSource) {
            this.props.cancelTokenSource.cancel()
            console.log('aborted')
        }

        this.setState({
            inputText: '',
            inputValid: false,
            showErrorMessage: false
        })

        this.props.clearState()
    }

    submitHandler = event => {
        event.preventDefault()

        this.searchHandler(event)
    }

    render() {
        const {inputText, showErrorMessage} = this.state
        const {loading, results, activeElement} = this.props

        let mapData = null

        if (activeElement || activeElement === 0) {
            mapData = results[activeElement]
        }

        return (
            <div className = 'App'>
                <Map 
                    data = {mapData}
                />

                <Widget
                    inputText = {inputText}
                    showErrorMessage = {showErrorMessage}
                    loading = {loading}
                    results = {results}
                    activeElement = {activeElement}
                    onChange = {this.changeHandler}
                    onSearch = {this.searchHandler}
                    onClear = {this.clearHandler}
                    onSubmit = {this.submitHandler}
                    onItemClick = {this.props.itemClickHandler}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastSearch: state.lastSearch,
        loading: state.loading,
        results: state.results,
        activeElement: state.activeElement,
        cancelTokenSource: state.cancelTokenSource
    }
}

function mapDispatchToProps(dispatch) {
    return {
        nominatimRequest: (inputText, cancelTokenSource) => dispatch(nominatimRequest(inputText, cancelTokenSource)),
        itemClickHandler: id => dispatch(setMap(id)),
        clearState: () => dispatch(clearState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
