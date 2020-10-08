import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col, Toast } from 'react-bootstrap'
import { AiOutlineUserAdd } from 'react-icons/ai'
import styled from 'styled-components'
import axios from 'axios'

const SignUp = () => {

    const history = useHistory()

    // State of the status of the post request
    // NULL if nothin happens, 'error' if the request fails, 'success' if it doesnt fail
    const [submitStatus, setSubmitStatus] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    const submit = async (e) => {

        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const photoUrl = 'https://iili.io/2UMxcu.png'

        if(e.target.image.files.length > 0) {
            const base64 = await toBase64(e.target.image.files[0])
            const response = await axios.post('https://freeimage.host/api/1/upload', null, {params: {
                key:'6d207e02198a847aa98d0a2a901485a5',
                source: base64,
                // action: 'upload',
            }})
            console.log(response.data)
        }
        try {
            await axios.post('/api/user/signup', {
                firstName,
                lastName,
                email,
                password,
            })
            setSubmitStatus('success')
            setShowToast(true)
            history.push('/login')
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

                <Form.Group>
                    <Form.File id="image" label="Profile Photo" />
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
