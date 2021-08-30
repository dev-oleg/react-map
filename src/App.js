import React, {Component} from 'react'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'

class App extends Component {
    state = {
        inputText: '',
        inputValid: false,
        showErrorMessage: false
    }

    render() {
        return (
            <div className = 'App'>
                <Map />

                <Widget />
            </div>
        )
    }
}

export default App
