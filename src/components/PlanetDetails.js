import React           from 'react'
import {Descriptions}  from 'antd'

/**
 * Component lista os detalhes do planeta recebido
 * @param {Object} data Objeto contendo os dados do planeta
 * @author Michael Azevedo <michaelfernandes@id.uff.br>
 */
class PlanetDetails extends React.Component{
    render(){
        return(
            <div>
                <Descriptions>
                        <Descriptions.Item label='Population'>
                            {this.props.data.population}
                        </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                        <Descriptions.Item label='Climate'>
                            {this.props.data.climate}
                        </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                        <Descriptions.Item label='Terrain'>
                            {this.props.data.terrain}
                        </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default PlanetDetails