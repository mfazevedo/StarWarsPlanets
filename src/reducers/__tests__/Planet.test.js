import {
    FETCH_PLANETS_BEGIN,
    RETRIEVE_PLANET_FROM_CACHE,
    FETCH_PLANET_SUCCESS,
    FETCH_MULTIPLE_PLANETS_SUCCESS,
    FETCH_PLANETS_FAILURE
}                     from '../../actions/types'
import Planet_Reducer from '../planet'

var _ = require('lodash')

const initialState = {    
    planetCount: 0,
    activePlanet:{},
    planetCache: [],
    loading: true,
    error: null
}

const mockPlanet = {
	name: "Yavin IV",
	climate: "temperate, tropical",
	terrain: "jungle, rainforests",
	population: "1000",
	films: ["A New Hope"],
	url: "https://swapi.co/api/planets/3/"
}

it('handle actions of type FETCH_PLANETS_BEGIN',()=>{
    const action= {type: FETCH_PLANETS_BEGIN}
    const newState = Planet_Reducer(initialState, action)
    const expectecObject = {
        planetCount: 0,
        activePlanet:{},
        planetCache: [],
        loading: true,
        error: null       
    } 
    expect(_.isEqual(newState, expectecObject)).toBe(true)
})

it('handle actions of type RETRIEVE_PLANET_FROM_CACHE',()=>{
    const action= {
        type: RETRIEVE_PLANET_FROM_CACHE,
        payload: mockPlanet 
    }
    const newState = Planet_Reducer(initialState, action)
    const expectecObject = {
        planetCount: 0,
        planetCache: [],
        error: null,
        loading: false,
        activePlanet: mockPlanet
    } 
    expect(_.isEqual(newState, expectecObject)).toBe(true)
})

it('handle actions of type FETCH_PLANET_SUCCESS',()=>{
    const action= {
        type: FETCH_PLANET_SUCCESS,
        payload: mockPlanet 
    }
    const newState = Planet_Reducer(initialState, action)
    const expectecObject = {
        planetCount: 0,
        planetCache: [mockPlanet],
        error: null,
        loading: false,
        activePlanet: mockPlanet
    } 
    expect(_.isEqual(newState, expectecObject)).toBe(true)
})

it('handle actions of type FETCH_MULTIPLE_PLANETS_SUCCESS',()=>{
    const action= {
        type: FETCH_MULTIPLE_PLANETS_SUCCESS,
        payload: {
            count: 10,
            results:[mockPlanet, mockPlanet, mockPlanet]
        }
    }
    const newState = Planet_Reducer(initialState, action)
    const expectecObject = {
        planetCount: 10,
        planetCache: [mockPlanet, mockPlanet, mockPlanet],
        error: null,
        loading: false,
        activePlanet: mockPlanet
    } 
    expect(_.isEqual(newState, expectecObject)).toBe(true)
})

it('handle actions of type FETCH_PLANETS_FAILURE',()=>{
    const action= {
        type: FETCH_PLANETS_FAILURE,
        payload: 'Connection error'
    }
    const newState = Planet_Reducer(initialState, action)
    const expectecObject = {    
        planetCount: 0,
        activePlanet:{},
        planetCache: [],
        loading: false,
        error: 'Connection error'
    }
    expect(_.isEqual(newState, expectecObject)).toBe(true)
})

it('handle actions with unknow type',()=>{
    const newState = Planet_Reducer(initialState, {})
    expect(_.isEqual(newState, initialState)).toBe(true)
})



