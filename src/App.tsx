import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import {
    fetchNominatim,
    clearAction,
    setActiveElementAction
} from './redux/actions/actionCreator'
import {Context} from './context'
import './App.css'
import Map from './components/Map/Map'
import Widget from './components/Widget/WidgetTS'
import axios, {CancelTokenSource} from 'axios'



const App: React.FC = () => {
    const loading = useSelector(state => state.loading) //
    const results = useSelector(state => state.results) //
    const activeElement = useSelector(state => state.activeElement) //
    const cancelTokenSource = useSelector(state => state.cancelTokenSource) //

    const dispatch = useDispatch()
    // const dispatch: Dispatch = useDispatch()

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
        
        dispatch(fetchNominatim(inputText, cancelToken))
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

        dispatch(clearAction())
    }

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        
        searchHandler(event)
    }

    const itemClickHandler = (id: number) => {
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
