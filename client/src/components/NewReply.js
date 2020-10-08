import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import loginService from '../services/login'

const NewReply = (props) => {

    const [text, setText] = useState('')
    const handleChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }
    const id = props.id
    const show = props.show
    const handleClose = props.handleClose

    const post = async () => {
        const token = loginService.getCurrUserToken()
        try {
            await axios.post(`/api/comment/reply/${id}`, { text }, {
                headers: 
                {
                    authorization: `Bearer ${token}`
                }
            })
        } catch(error) {
            console.error(error)
        }
        handleClose()
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="text">
                            <Form.Control as="textarea" rows="3" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" style={{ backgroundColor: '#ff2e63', borderColor: '#ff2e63'  }} onClick={post}>Reply</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewReply
