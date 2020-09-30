import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { AiOutlineLogout } from 'react-icons/ai'
import styled from 'styled-components'

const Logim      = () => {

    const submit = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
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

export default Logim
