import React from 'react'
import { List } from 'antd'

class MovieList extends React.Component{
    render(){     
        return(
            <List
                size="small"
                header={<h4>{'Featured in ' + this.props.data.length +  ' films'}</h4>}
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