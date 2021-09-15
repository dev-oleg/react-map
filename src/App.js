import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNominatim, clear, setActiveElement} from './redux/actions/app'
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

    searchHandler = async event => {
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

        this.props.nominatim(inputText, cancelTokenSource)
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
            showErrorMessage: false,
        })

        this.props.clear()
    }

    submitHandler = event => {
        event.preventDefault()

        this.searchHandler(event)
    }

    itemClickHandler = id => {
        // console.log(this.state.results[id])
        
        this.props.setActiveElement(id)
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
                    onItemClick = {this.itemClickHandler}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastSearch: state.app.lastSearch,
        loading: state.app.loading,
        results: state.app.results,
        activeElement: state.app.activeElement,
        cancelTokenSource: state.app.cancelTokenSource
    }
}

function mapDispatchToProps(dispatch) {
    return {
        nominatim: (text, token) => dispatch(fetchNominatim(text, token)),
        clear: () => dispatch(clear()),
        setActiveElement: id => dispatch(setActiveElement(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
