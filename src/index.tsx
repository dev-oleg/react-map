import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, Store, Dispatch} from 'redux'
import thunk from 'redux-thunk'
import {reducer} from './redux/reducers/reducerTS'
import {IRootState, Action} from './types'
import './index.css'
import App from './App'

// const store: Store<IRootState, Action> & {dispatch: Dispatch} = createStore(reducer, applyMiddleware(thunk))
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
)