import React                           from 'react'
import {Provider}                      from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import thunk                           from 'redux-thunk'
import reducers                        from './reducers'

/**
 * Arquivo de criação da store
 * @author Michael Azevedo <michaelfernandes@id.uff.br>
 */

export default props => {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
            {props.children}
        </Provider>
    )
}