import React, {useState, useRef, useReducer} from 'react'
import {dispatchMiddleware} from './redux/reducers/dispatchMiddleware'
import {reducer} from './redux/reducers/reducer'
import {
    fetchNominatimInit,
    fetchNominatim,
    clearAction,
    setActiveElementAction
} from './redux/actions/actionCreator'
import {Context} from './context'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'
import axios from 'axios'



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

    const [state, dispatchBase] = useReducer(reducer, reducerInitialState)
    const dispatch = dispatchMiddleware(dispatchBase)

    const inputHandler = event => {
        const text = event.target.value

        setInputText(text)
        setInputValid(!!text.trim())
        setShowErrorMessage(false)
    }

    const searchHandler = event => {
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
        
        dispatch(fetchNominatimInit(cancelToken))
        dispatch(fetchNominatim(inputText, cancelToken))
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
