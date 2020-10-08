import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import styled from 'styled-components'
import loginService from '../services/login'

const Login = (props) => {

    const displayMessage = props.displayMessage

    const history = useHistory()


    const submit = async (e) => {
        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value

        try {
            const user = await axios.post('/api/user/login', {
                email,
                password,
            })

            loginService.loginUser(user.data.token, user.data.user)
            history.push('/')
        } catch(error) {
            console.error(error)
            displayMessage('error', error.toString())

        }
    }

    return (
        <Wrapper>


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
