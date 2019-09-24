import React           from 'react'
import {Descriptions}  from 'antd'

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