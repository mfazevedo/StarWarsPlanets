import {
    FETCH_FILMS
} from '../actions/types'

const initialState = []

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_FILMS:
            return action.payload.films                
        default:
            return state
    }
}