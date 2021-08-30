import React, {Component} from 'react'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'

class App extends Component {
    state = {
        inputText: ''
    }

    changeHandler = event => {
        const inputText = event.target.value.trim()

        this.setState({
            inputText
        })

        console.log('change', inputText)
    }

    searchHandler = event => {
        event.preventDefault()

        console.log('search', this.state.inputText)
    }

    clearHandler = event => {
        event.preventDefault()

        this.setState({
            inputText: ''
        })

        console.log('clear')
    }

    submitHandler = event => {
        event.preventDefault()
        console.log('submit')

        this.searchHandler(event)
    }

    render() {
        return (
            <div className = 'App'>
                <Map />

                <Widget
                    inputText = {this.state.inputText}
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
