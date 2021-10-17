import React, {useState, useRef, useReducer} from 'react'
import {clearAction, setActiveElementAction} from './redux/actions/app'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'
import axios from 'axios'
import {Context} from './context'
import reducer from './redux/reducers/reducer'
import {
    FETCH_NOMINATIM_START,
    FETCH_NOMINATIM_FINISH,
    FETCH_NOMINATIM_ERROR
} from './redux/actions/actionTypes'

const baseURL = 'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmaps.org'



function App() {
    const [inputText, setInputText] = useState('')
    const [inputValid, setInputValid] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const lastSearch = useRef('')

    const reducerInitialState = {
        loading: false,
        results: null,
        activeElement: null,
        cancelTokenSource: null
    }

    const [state, dispatch] = useReducer(reducer, reducerInitialState)

    const inputHandler = event => {
        const text = event.target.value

        setInputText(text)
        setInputValid(!!text.trim())
        setShowErrorMessage(false)
    }

    const searchHandler = async event => {
        event.preventDefault()

        if (!inputValid) {
            setShowErrorMessage(true)
            return
        }

        if (lastSearch.current === inputText) return

        lastSearch.current = inputText

        if (state.cancelTokenSource) {
            state.cancelTokenSource.cancel()
            console.log('aborted')
        }

        const cancelToken = axios.CancelToken.source()
        
        dispatch({
            type: FETCH_NOMINATIM_START,
            payload: inputText,
            token: cancelToken
        })
        
        try {
            const response = await axios.get(baseURL, {
                params: {
                    q: inputText,
                    polygon_geojson: 1,
                    limit: 30,
                    format: 'json'
                },
                cancelToken: cancelToken.token
            })

            dispatch({
                type: FETCH_NOMINATIM_FINISH,
                payload: response.data
            })

        } catch(error) {
            console.log(error)

            dispatch({
                type: FETCH_NOMINATIM_ERROR
            })
        }
    }

    const clearHandler = event => {
        event.preventDefault()

        if (state.cancelTokenSource) {
            state.cancelTokenSource.cancel()
            console.log('aborted')
        }

        setInputText('')
        setInputValid(false)
        setShowErrorMessage(false)

        lastSearch.current = ''

        dispatch(clearAction())
    }

    const submitHandler = event => {
        event.preventDefault()
        
        searchHandler(event)
    }

    const itemClickHandler = id => {
        dispatch(setActiveElementAction(id))
    }

    return (
        <Context.Provider value = {{
            inputText,
            showErrorMessage,
            loading: state.loading,
            results: state.results,
            activeElement: state.activeElement,

            inputHandler,
            searchHandler,
            clearHandler,
            submitHandler,
            itemClickHandler
        }}>
            <div className = 'App'>
                <Map />
                <Widget />
            </div>
        </Context.Provider>
    )
}

export default App
