import React from 'react'
import { List } from 'antd'

/**
 * Component lista os filmes recebidos
 * @param {Array} data Lista de filmes
 * @author Michael Azevedo <michaelfernandes@inheritdoc.uff.br>
 */
class MovieList extends React.Component{
    render(){     
        return(
            <List
                size="small"
                header={
                    <h4>
                        {'Featured in ' + this.props.data.length +  ' films'}
                    </h4>
                }
                dataSource={this.props.data}
                renderItem={ item => 
                    <List.Item>
                        {item}
                    </List.Item>
                }
            />
        )
    }
}

export default MovieList