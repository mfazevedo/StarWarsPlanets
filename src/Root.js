import React                           from 'react'
import {Provider}                      from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import thunk                           from 'redux-thunk'
import reducers                        from './reducers'
import reduxPromise                    from 'redux-promise'

/**
 * Arquivo de criação da store
 * @author Michael Azevedo <michaelfernandes@id.uff.br>
 */

export default props => {
    const store = createStore(reducers, {}, applyMiddleware(thunk, reduxPromise))
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}