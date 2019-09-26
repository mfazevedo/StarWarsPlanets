import {FETCH_FILMS}  from '../../actions/types'
import Films_Reducer  from '../films'

var _ = require('lodash')

const initialState = []

const mockFilms = {
    films:[
    {
        "title": "A New Hope",
        "episode_id": 4,
    },
    {
        "title": "Attack of the Clones",
        "episode_id": 2,
    }
]}

it('handle actions of type FETCH_FILMS',()=>{
    const action= {
        type: FETCH_FILMS,
        payload: mockFilms
    }
    const newState = Films_Reducer(initialState, action)
    const expectecObject = mockFilms.films

    expect(_.isEqual(newState, expectecObject)).toBe(true)
})
