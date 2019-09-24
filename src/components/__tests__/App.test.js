import React           from 'react'
import {mount}       from 'enzyme'
import App             from '../App'
import PlanetDetails   from '../PlanetDetails'
import MovieList       from '../MovieList'
import Root            from '../../Root'
import {Button, Card}  from 'antd'

let wrapped

beforeEach(()=>{
    wrapped = mount(
        <Root>
            <App/>
        </Root>
    )
})

afterEach(()=>{
    wrapped.unmount()
})

it('Main card rendered',()=>{
    expect(wrapped.find(Card).length).toEqual(1)
})

it('Planet details rendered',()=>{
    expect(wrapped.find(PlanetDetails).length).toEqual(1)
})

it('Films list rendered',()=>{
    expect(wrapped.find(MovieList).length).toEqual(1)
})

it('Shuffle button rendered',()=>{
    expect(wrapped.find(Button).length).toEqual(1)
})

