import React                           from 'react'
import {Provider}                      from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import thunk                           from 'redux-thunk'
import reducers                        from './reducers'


export default props => {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
            {props.children}
        </Provider>
    )
}