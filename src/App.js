import React, {Component} from 'react'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'

class App extends Component {
    state = {
        inputText: '',
        inputValid: false,
        showErrorMessage: false,
        lastSearch: ''
    }

    changeHandler = event => {
        const inputText = event.target.value.trim()

        this.setState({
            inputText,
            inputValid: !!inputText,
            showErrorMessage: false
        })
    }

    searchHandler = event => {
        event.preventDefault()

        if (!this.state.inputValid) {
            this.setState({showErrorMessage: true})

            return
        }

        const {inputText, lastSearch} = this.state

        if (inputText === lastSearch) return

        this.setState({lastSearch: inputText})
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
