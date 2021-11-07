import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
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
    const loading = useSelector(state => state.loading)
    const results = useSelector(state => state.results)
    const activeElement = useSelector(state => state.activeElement)
    const cancelTokenSource = useSelector(state => state.cancelTokenSource)

    const dispatch = useDispatch()

    const [inputText, setInputText] = useState('')
    const [inputValid, setInputValid] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const lastSearch = useRef('')



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
        
        if (cancelTokenSource) {
            cancelTokenSource.cancel()
            console.log('aborted')
        }

        const cancelToken = axios.CancelToken.source()
        
        dispatch(fetchNominatim(inputText, cancelToken))
    }

    const clearHandler = event => {
        event.preventDefault()

        if (cancelTokenSource) {
            cancelTokenSource.cancel()
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
            loading,
            results,
            activeElement,

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
