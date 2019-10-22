import React                        from 'react'
import {mount}                      from 'enzyme'
import App                          from '../components/App'
import Root                         from '../Root'
import moxios                       from 'moxios'
import {Button, Card}               from 'antd'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import {Provider}                   from 'react-redux';
import PlanetDetails                from '../components/PlanetDetails'

let wrapped

const options = {
    disableLifecycleMethods: true 
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
	name: "Alderaan",
	climate: "temperate",
	terrain: "grasslands, mountains",
	population: "2000000000",
	films: ["A New Hope", "Revenge of the Sith"],
	url: "https://swapi.co/api/planets/2/"
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

const address = /https:\/\/swapi.co\/api\/planets/[0-9]/

beforeEach(()=>{
    moxios.install()
    moxios.stubRequest(
        address,
        {
            status: 200,
            response: mockPlanet
        }
    )
})

afterEach(()=>{
    moxios.uninstall()
})

it('Fetch planet on click',()=>{

    wrapped = mount(
        <Provider store={store}>
            <App/>
        </Provider>, options
    ) 
    
    wrapped.find('.button-get-planet').first().simulate('click')
    wrapped.update()
    console.log('<<<', store.getState())
    console.log('>>>', wrapped.text())
    expect(wrapped.find(Card).length).toEqual(1)
    //expect(wrapped.find(Card).dive().text()).toEqual('abc')//find(PlanetDetails).text()).toEqual('Yavin IV')

    //expect(wrapped.text()).toEqual('Yavin IV')
})

