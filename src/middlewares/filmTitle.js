import {FETCH_PLANET_SUCCESS, FETCH_MULTIPLE_PLANETS_SUCCESS} from '../actions/types'

var _ = require('lodash')

/**
 * Dado uma URL de filme retorna o Título do mesmo na Store.
 * @param {String} filmUrl URL de chamada do filme (Utilizado como ID único)
 * @param {Array} filmList Lista que contém todos os filmes 
 * @Return {String} Título do filme
 */
function findFilmInList(filmUrl, filmList){
    let obj =  _.find(filmList, {url: filmUrl})
    
    if (obj){
      return obj.title
    }
    else{
      return 'Not found title'
    }
}

/**
 * Atualiza o array de filmes contido em um planeta para os Nomes de cada filme
 * no lugar de suas URL's
 * @param {Object} planet Planeta contendo a lista de filmes
 * @param {Array} filmList Lista que contém todos os filmes (Retirados da Store)
 * @Return {Object} Planeta com array de filmes contendo os títulos ou Informação string de erro nos
 */
function replaceFilmURLforTitle(planet, filmList){
    const planetWithoutFilmError = Object.assign({}, planet, {films: ['No Film Data. Reload.']})
    if (!filmList){
        return planetWithoutFilmError
    }
    else{
        if(filmList.length == 0){
            return planetWithoutFilmError
        }
        else{
            const films = planet.films.map( elt => findFilmInList(elt, filmList))
            return Object.assign(planet, {films: films})
        }
    }    
}

/**
 * Atualiza o array de filmes contido em um array de planeta para os Nomes de cada filme
 * no lugar de suas URL's
 * @param {Array} planets Lista de Planetas
 * @param {Array} filmList Lista que contém todos os filmes (Retirados da Store)
 * @Return {Array} Lista de Planetas com array de filmes contendo os títulos
 */
function replaceFilmURLforTitleMass(planets, filmList){
    const planetList = planets.map( elt => replaceFilmURLforTitle(elt, filmList))
    return planetList
}

/**
 * Middleware que atualiza o nome dos filmes quando existe retorno do servidor
 * no lugar de suas URL's
 * @param {function} next Proximo middleware
 * @param {function} action Ação recebida
 * @Return {function} Nova ação ou continue na cadeia de middlewares
 */
export default ({dispatch, getState}) => (next) => (action) => {  

    if(action.hasOwnProperty('payload')){
        if(action.payload.hasOwnProperty('flgEntitled')){
            return (next(action))
        }
    }    

    switch (action.type){
        case FETCH_PLANET_SUCCESS:              
            let planetWithFilms = replaceFilmURLforTitle(action.payload, getState().films)            
            planetWithFilms = {...planetWithFilms, flgEntitled: true}            
            const newFetchPlanetSucces = {...action, payload: planetWithFilms}        
            dispatch(newFetchPlanetSucces)
            break

        case FETCH_MULTIPLE_PLANETS_SUCCESS:
            const planetListWithFilms = {
                ...action.payload,
                results: replaceFilmURLforTitleMass(action.payload.results, getState().films),
                flgEntitled: true
            }            
            const newFetchMultiplePlanetsSucces = {...action, payload: planetListWithFilms}        
            dispatch(newFetchMultiplePlanetsSucces)
            break

        default:
            return (next(action))
    }    
}