import {
    FETCH_PLANETS_BEGIN,
    FETCH_PLANET_SUCCESS,
    FETCH_PLANETS_FAILURE,
    FETCH_MULTIPLE_PLANETS_SUCCESS,
    RETRIEVE_PLANET_FROM_CACHE
} from '../actions/types'

const initialState = {    
    planetCount: 0,
    activePlanet:{},
    planetCache: [],
    loading: true,
    error: null
}

export default function(state = initialState, action){
    //console.log("Action >", action)
    switch(action.type){
        case FETCH_PLANETS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                activePlanet:{}
            }            
        case RETRIEVE_PLANET_FROM_CACHE:
            
            return {
                ...state,
                error: null,
                loading: false,
                activePlanet: action.payload
            }        
        case FETCH_PLANET_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    activePlanet: action.payload,
                    planetCache: [...state.planetCache, action.payload]
                }
        case FETCH_MULTIPLE_PLANETS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                planetCount: action.payload.count,
                activePlanet:action.payload.results[1],
                planetCache: action.payload.results
            }
        case FETCH_PLANETS_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
        default:
            return state
    }
}