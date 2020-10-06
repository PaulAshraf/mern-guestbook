import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Toast } from 'react-bootstrap'
import { AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import styled from 'styled-components'

const Login = () => {

    // State of the status of the post request
    // NULL if nothin happens, 'error' if the request fails, 'success' if it doesnt fail
    const [submitStatus, setSubmitStatus] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value

        try {
            await axios.post('/api/user/login', {
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


            <h1>Login <AiOutlineLogout style={{ color: '#252a34'}} /></h1>

           <Form onSubmit={submit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <p>If you do not have an account, <a href='/signup'>Sign up here</a>.</p>
               
                <Button variant="primary" type="submit" color='#ff2e63' style={{ backgroundColor: '#ff2e63', borderColor: '#ff2e63'  }}>
                    <ButtonWrapper>Login</ButtonWrapper>
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

export default Login
