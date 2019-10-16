import React    from 'react'
import {mount}  from 'enzyme'
import {Root}   from '../Root'
import {App}    from '../components/App'
import moxios   from 'moxios'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import {Provider}                   from 'react-redux';

let wrapped

const filmsMockResponse = {
    count: 7,
    results:[
        {title:"A New Hope",              url:"https://swapi.co/api/films/1/"},
        {title:"Attack of the Clones",    url:"https://swapi.co/api/films/5/"},
        {title:"The Phantom Menace",      url:"https://swapi.co/api/films/4/"},
        {title:"Revenge of the Sith",     url:"https://swapi.co/api/films/6/"},
        {title:"Return of the Jedi",      url:"https://swapi.co/api/films/3/"},
        {title:"The Empire Strikes Back", url:"https://swapi.co/api/films/7/"},
        {title:"The Empire Strikes Back", url:"https://swapi.co/api/films/2/"}
    ]
}

const mockPlanet = {
    name: "Yavin IV",
    climate: "temperate, tropical",
    terrain: "jungle, rainforests",
    population: "1000",
    films: ["A New Hope"],
    url: "https://swapi.co/api/planets/3/"
}

const initialPlanet = {
    name: "OIOIOI",
    climate: "temperate, tropical",
    terrain: "jungle, rainforests",
    population: "1000",
    films: ["A New Hope"],
    url: "https://swapi.co/api/planets/3/"
}

const mockStore = configureMockStore([thunk])

const store = mockStore({
    planets:{    
        planetCount: 1,
        activePlanet: initialPlanet,
        planetCache: [],
        loading: false,
        error: null
    }        
})



const API_ADDRESS_PLANETS = 'https://swapi.co/api/planets/'
const API_ADDRESS_FILMS   = 'https://swapi.co/api/films/'

beforeEach(()=>{
    wrapped = mount(
        <Provider store={store}>
            <App/>
        </Provider>
    )
})

describe('fetchMultiplePlanetsSuccess', ()=>{

    beforeEach(()=>{
        moxios.install()
        moxios.stubRequest('https://swapi.co/api/planets/3/', {
            status: 200,
            response: mockPlanet            
        })
    })

    /* it('Can fetch initial Movies', ()=>{
        expect(action.payload).toEqual(mock)
        //TODO: Fetch initial movies
    }) */
    
    it('Should get a random planet from API', ()=>{
        wrapped.find('.button-get-planet').simulate('click')
        expect(wrapped.text()).toContain('Yavin IV')
    })

    afterEach(()=>{
        moxios.uninstall()
    })
})

 