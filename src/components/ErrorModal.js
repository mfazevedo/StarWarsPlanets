
import {
    Button,
    Modal,
    Row,
    Col
}            from 'antd'
import React from 'react'

class ErrorModal extends React.Component{
    render(){  

        const TEXT_ERROR_BODY = 'Sorry, Millennium Falcon is under maintenance, we could not find a planet at the moment.'
   
        return(
            <Modal
                title={this.props.message}
                centered
                visible={true}
                footer={[
                    <Button onClick={this.props.action}>
                        Retry
                    </Button>
                ]}
            >   
                <Row>
                    <Col span={12}>
                        <img src="MillenniumFalcon.jpg" alt="MillenniumFalcon" width="235" height="280"></img>
                    </Col>
                    <Col span={12}>
                        <div align='center' className='div-error'>
                            <h2 className='magin-text-error'>{TEXT_ERROR_BODY}</h2>
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ErrorModal