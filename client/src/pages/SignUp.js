import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col, Toast } from 'react-bootstrap'
import { AiOutlineUserAdd } from 'react-icons/ai'
import styled from 'styled-components'
import axios from 'axios'

const SignUp = () => {

    // State of the status of the post request
    // NULL if nothin happens, 'error' if the request fails, 'success' if it doesnt fail
    const [submitStatus, setSubmitStatus] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const submit = async (e) => {

        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value

        try {
            await axios.post('/api/user/signup', {
                firstName,
                lastName,
                email,
                password,
            })
            setSubmitStatus('success')
            setShowToast(true)
            
        } catch(error) {
            console.error(error)
            setSubmitStatus('error')
            setShowToast(true)

        }

    }

    return (
        <Wrapper>

            {submitStatus && <Toast show={showToast} onClose={() => setShowToast(!showToast)} delay={3000} autohide>
            {submitStatus === 'error' ? 'Oops! An Error has occured':'Acconut Created Succesfully'}
            </Toast>}

            <h1>Sign Up <AiOutlineUserAdd style={{ color: '#252a34'}} /></h1>

           <Form onSubmit={submit}>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="firstName">   
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName">   
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Last name" />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
               
                <Button variant="primary" type="submit" color='#ff2e63' style={{ backgroundColor: '#ff2e63', borderColor: '#ff2e63'  }}>
                    <ButtonWrapper>Sign Up</ButtonWrapper>
                </Button>
            </Form> 
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 50%;
    margin: auto;
    margin-top: 1em;
` 

const ButtonWrapper = styled.div`
    background: #ff2e63;
`

export default SignUp
