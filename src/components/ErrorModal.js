
import {
    Button,
    Modal,
    Row,
    Col
}            from 'antd'
import React from 'react'

/**
 * Component que é exibe exibido quando algum erro é apresentado
 * @param {String} message Erro ue é exibido como título do Modal
 * @param {function} action Ação a ser executada quando o botão de "Retry" do modal
 * @author Michael Azevedo <michaelfernandes@inheritdoc.uff.br>
 */
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
                        <img src="MillenniumFalcon.png" alt="MillenniumFalcon" width="235" height="280"></img>
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