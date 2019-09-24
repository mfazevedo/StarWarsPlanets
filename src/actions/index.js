import {
    FETCH_PLANETS_BEGIN,
    FETCH_PLANET_SUCCESS,
    FETCH_PLANETS_FAILURE,
    FETCH_MULTIPLE_PLANETS_SUCCESS,
    FETCH_FILMS,
    RETRIEVE_PLANET_FROM_CACHE
}            from './types'
import fetch from 'cross-fetch'

var _ = require('lodash')

const API_ADDRESS_PLANETS = 'https://swapi.co/api/planets/'
const API_ADDRESS_FILMS   = 'https://swapi.co/api/films/'

let filmList = []

function getOnePlanet(id){
    return dispatch => {
        dispatch(updateFilmListFromStore())
        dispatch(fetchPlanetsBegin())
        return apiCall(API_ADDRESS_PLANETS + id)
          .then(json => {
            dispatch(fetchPlanetSuccess(json))
          })
          .catch(error => {
            console.log('ERRO', error)
            dispatch(fetchPlanetsFailure(error))
          })
    }
}

function getPlanetFromCache(planet){
  return dispatch => {
      dispatch(fetchPlanetsBegin())
      dispatch(retrievePlanetFromCache(planet))
  }
}

export function getInitialData(){
  return dispatch => {   
      dispatch(fetchPlanetsBegin())
      dispatch(getFilms())
      .then(() => {
        dispatch(getInitialPlanets())
      })
      .catch(error => {
        console.log('ERRO', error)
        dispatch(fetchPlanetsFailure(error))
      })
  }
}

export function verifyCache(id){
  return (dispatch, getState) => {
    const planetsInCache = getState().planets.planetCache
    const searchResult = _.find(planetsInCache, {url: API_ADDRESS_PLANETS + id + '/'})

    if(searchResult){
      dispatch(getPlanetFromCache(searchResult))
    }
    else{
      dispatch(getOnePlanet(id))
    }
  }
}

export function getFilms(){
  return dispatch => {    
      return apiCall(API_ADDRESS_FILMS)
        .then(json => {
          dispatch(fetchAllFilms(json.results))
        })
        .catch(error => {
          throw error
        })
  }
}

export function getInitialPlanets(){
  return dispatch => {    
      dispatch(updateFilmListFromStore()) 
      return apiCall(API_ADDRESS_PLANETS)
        .then(json => {
          dispatch(fetchMultiplePlanetsSuccess(json))
        })
        .catch(error => {
          throw error
        })
  }
}

function findFilmInStore(filmUrl){
    let obj =  _.find(filmList, {url: filmUrl})
    
    if (obj){
      return obj.title
    }
    else{
      return 'Not found title'
    }
}

function loadMovieListFromStore(planet){
  const films = planet.films.map( elt => findFilmInStore(elt))
  return Object.assign(planet, {films: films})
}

function updateFilmListFromStore() {
  return (dispatch, getState) => {
    filmList = getState().films
  }
}

function loadMovieListFromStoreMass(planets){
  const planetList = planets.results.map( elt => loadMovieListFromStore(elt))
  return Object.assign(planets, {results: planetList})
}

function apiCall(address) {
  return fetch(address)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
    })
}

export const fetchAllFilms = films => ({
  type: FETCH_FILMS,
  payload: {films}
})

export const fetchPlanetsBegin = () => ({
    type: FETCH_PLANETS_BEGIN
})

export const retrievePlanetFromCache = planet => ({
  type: RETRIEVE_PLANET_FROM_CACHE,
  payload: planet
})

export const fetchPlanetSuccess = planet => ({
    type: FETCH_PLANET_SUCCESS,
    payload: loadMovieListFromStore(planet)
})

export const fetchMultiplePlanetsSuccess = planetsData => ({
  type: FETCH_MULTIPLE_PLANETS_SUCCESS,
  payload: loadMovieListFromStoreMass(planetsData)
})

export const fetchPlanetsFailure = error => ({
    type: FETCH_PLANETS_FAILURE,
    payload: error 
})