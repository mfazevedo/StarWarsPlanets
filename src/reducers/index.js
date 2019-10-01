import {combineReducers} from 'redux'
import Planet            from './planet'
import Films             from './films'

export default combineReducers({
    planets: Planet,
    films: Films
})