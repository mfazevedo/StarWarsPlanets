import React            from 'react'
import PlanetDetails    from './PlanetDetails'
import MovieList        from './MovieList'
import ErrorModal       from './ErrorModal'
import {connect}        from 'react-redux'
import * as actions     from '../actions'
import {Button,Card}    from 'antd'

/**
 * Container que Renderiza o componente principal da aplicação.
 * contém um CARD com 2 componentes filhos: Os detalhes do planeta
 * e a lista de filmes.
 * 
 * Caso a reuisição da API retorne erro, um MODAL de erro é exibido
 * 
 * Container com ligação com a Store
 * 
 * @author Michael Azevedo <michaelfernandes@id.uff.br>
 */
class App extends React.Component {
    componentDidMount() {
        this.props.getInitialData()
    }

    /**
     * @returns {Number} inteiro entre 1 e o número de planetas
    */
    getRandomPlanetID(){
        const randomNumber = Math.floor((Math.random() * this.props.planetCount) + 1)
        return randomNumber
    }

    render(){
        const { error, loading, activePlanet } = this.props

        /**
         * Inicia o processo da função @see {verifyCache} com o planeta
         * de ID gerado pela função @see {getRandomPlanetID}
        */
        const shufflePlanet = () => {
            this.props.verifyCache(this.getRandomPlanetID())
        }

        if (error) {
            return(
                <ErrorModal
                    message={error.message}
                    action={shufflePlanet}
                />
            )
        }
        
        return(
            <div className='center-div' align='center'>
                <img src="logo.png" alt="MillenniumFalcon" width="191" height="104"></img>
                <h3>Planet's Info</h3>
                <Card
                    title={activePlanet.name}
                    loading={loading}
                    className='main-card'
                >
                    <PlanetDetails data={activePlanet}/>
                    <MovieList data={activePlanet.films}/>
                </Card>
                <br></br>
                <Button className='button-get-planet' onClick={shufflePlanet}>
                    NEXT
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({   
    activePlanet: state.planets.activePlanet,
    planetCache: state.planets.planetCache,
    planetCount: state.planets.planetCount,
    loading: state.planets.loading,
    error: state.planets.error,
    films: state.films
})

export default connect(mapStateToProps, actions) (App)