import React from 'react'
import { Toast } from 'react-bootstrap'
import {AiOutlineWarning, AiOutlineCheckCircle} from 'react-icons/ai'

const Message = (props) => {

    const type = props.type
    const showToast = props.show
    const message = props.message
    const close = props.close

    return (<>
        <Toast show={showToast} onClose={close} delay={3000} autohide 
        style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '50px',
          }}>
        <Toast.Header>{type === 'error' ? <AiOutlineWarning /> : <AiOutlineCheckCircle />}</Toast.Header>
        <Toast.Body>{message}</Toast.Body>
        </Toast>
        </>
    )
}

export default Message