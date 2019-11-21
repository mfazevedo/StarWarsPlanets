import {
    fetchPlanetsFailure,
    fetchMultiplePlanetsSuccess,
    fetchPlanetSuccess,
    retrievePlanetFromCache,
    fetchPlanetsBegin,
    fetchAllFilms
} from '../index'

import {
    FETCH_PLANETS_FAILURE,
    FETCH_MULTIPLE_PLANETS_SUCCESS,
    FETCH_PLANET_SUCCESS,
    RETRIEVE_PLANET_FROM_CACHE,
    FETCH_PLANETS_BEGIN,
    FETCH_FILMS
} from '../types'

const mockPlanet = {
	name: "Yavin IV",
	climate: "temperate, tropical",
	terrain: "jungle, rainforests",
	population: "1000",
	films: ["A New Hope"],
	url: "https://swapi.co/api/planets/3/"
}

const mockFilms = [
    {
        "title": "A New Hope",
        "episode_id": 4,
    },
    {
        "title": "Attack of the Clones",
        "episode_id": 2,
    }
]

describe('fetchPlanetsFailure', ()=>{
    it('has correct type',()=>{
        const action = fetchPlanetsFailure()
        expect(action.type).toEqual(FETCH_PLANETS_FAILURE)
    })
    it('has correct payload',()=>{
        const action = fetchPlanetsFailure('NetWork Error')
        expect(action.payload).toEqual('NetWork Error')
    })    
})

describe('fetchMultiplePlanetsSuccess', ()=>{
    const mock = {count:10, results: [mockPlanet,mockPlanet,mockPlanet]}
    it('has correct type',()=>{
        const action = fetchMultiplePlanetsSuccess(mock)
        expect(action.type).toEqual(FETCH_MULTIPLE_PLANETS_SUCCESS)
    })
    it('has correct payload',()=>{
        const action = fetchMultiplePlanetsSuccess(mock)
        expect(action.payload).toEqual(mock)
    })    
})

describe('fetchPlanetSuccess', ()=>{
    it('has correct type',()=>{
        const action = fetchPlanetSuccess(mockPlanet)
        expect(action.type).toEqual(FETCH_PLANET_SUCCESS)
    })
    it('has correct payload',()=>{
        const action = fetchPlanetSuccess(mockPlanet)
        expect(action.payload).toEqual(mockPlanet)
    })    
})

describe('retrievePlanetFromCache', ()=>{
    it('has correct type',()=>{
        const action = retrievePlanetFromCache(mockPlanet)
        expect(action.type).toEqual(RETRIEVE_PLANET_FROM_CACHE)
    })
    it('has correct payload',()=>{
        const action = retrievePlanetFromCache(mockPlanet)
        expect(action.payload).toEqual(mockPlanet)
    })    
})

describe('fetchPlanetsBegin', ()=>{
    it('has correct type',()=>{
        const action = fetchPlanetsBegin(mockPlanet)
        expect(action.type).toEqual(FETCH_PLANETS_BEGIN)
    }) 
})

describe('fetchAllFilms', ()=>{
    it('has correct type',()=>{
        const action = fetchAllFilms()
        expect(action.type).toEqual(FETCH_FILMS)
    })
    it('has correct payload',()=>{
        const action = fetchAllFilms(mockFilms)
        expect(action.payload.films).toEqual(mockFilms)
    })    
})

