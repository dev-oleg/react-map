import React, { useState, useRef } from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, State } from './redux/index'
import { Context } from './context'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/Widget'
import axios, { CancelTokenSource } from 'axios'



const App: React.FC = () => {
    const loading = useSelector((state: State) => state.loading)
    const results = useSelector((state: State) => state.results)
    const activeElement = useSelector((state: State) => state.activeElement)
    const cancelTokenSource = useSelector((state: State) => state.cancelTokenSource)

    const dispatch = useDispatch()

    const {
        fetchNominatim,
        clearAction,
        setActiveElementAction
    } = bindActionCreators(actionCreators, dispatch)

    const [inputText, setInputText] = useState<string>('')
    const [inputValid, setInputValid] = useState<boolean>(false)
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

    const lastSearch = useRef<string>('')



    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = event.target.value

        setInputText(text)
        setInputValid(!!text.trim())
        setShowErrorMessage(false)
    }

    const searchHandler = (event: React.MouseEvent) => {
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

        const cancelToken: CancelTokenSource = axios.CancelToken.source()
        
        fetchNominatim(inputText, cancelToken)
    }

    const clearHandler = (event: React.MouseEvent) => {
        event.preventDefault()

        if (cancelTokenSource) {
            cancelTokenSource.cancel()
            console.log('aborted')
        }

        setInputText('')
        setInputValid(false)
        setShowErrorMessage(false)

        lastSearch.current = ''

        clearAction()
    }

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        
        searchHandler(event)
    }

    const itemClickHandler = (id: number) => {
        setActiveElementAction(id)
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
