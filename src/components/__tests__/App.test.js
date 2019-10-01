import React                        from 'react'
import {mount}                      from 'enzyme'
import App                          from '../App'
import PlanetDetails                from '../PlanetDetails'
import MovieList                    from '../MovieList'
import Root                         from '../../Root'
import {Button, Card}               from 'antd'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import {Provider}                   from 'react-redux';

let wrapped

describe('render full component after loading', () =>{

    const mockPlanet = {
        name: "Yavin IV",
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
            activePlanet: mockPlanet,
            planetCache: [],
            loading: false,
            error: null
        }        
    })

    beforeEach(()=>{
        wrapped = mount(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    })

    it('Main card rendered',()=>{
        expect(wrapped.find(Card).length).toEqual(1)
    })
    
    it('Planet details not rendered when loading',()=>{
        expect(wrapped.find(PlanetDetails).length).toEqual(1)
    })
    
    it('Films list not rendered when loading',()=>{
        expect(wrapped.find(MovieList).length).toEqual(1)
    })
    
    it('Shuffle button rendered',()=>{
        expect(wrapped.find(Button).length).toEqual(1)
    })
})

describe('render loadind card', () =>{
    beforeEach(()=>{
        wrapped = mount(
            <Root>
                <App/>
            </Root>
        )  
    })

    it('Main card rendered',()=>{
        expect(wrapped.find(Card).length).toEqual(1)
    })
    
    it('Planet details not rendered when loading',()=>{
        expect(wrapped.find(PlanetDetails).length).toEqual(0)
    })
    
    it('Films list not rendered when loading',()=>{
        expect(wrapped.find(MovieList).length).toEqual(0)
    })
    
    it('Shuffle button rendered',()=>{
        expect(wrapped.find(Button).length).toEqual(1)
    })
})



