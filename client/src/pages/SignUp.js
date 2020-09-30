import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { AiOutlineUserAdd } from 'react-icons/ai'
import styled from 'styled-components'

const SignUp = () => {

    const submit = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
    }

    return (
        <Wrapper>

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
                    <Form.Control type="email" placeholder="email" />
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
