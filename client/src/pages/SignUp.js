import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { AiOutlineUserAdd } from 'react-icons/ai'
import styled from 'styled-components'
import axios from 'axios'

const SignUp = (props) => {

    const displayMessage = props.displayMessage

    const history = useHistory()

    // const toBase64 = file => new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => resolve(reader.result)
    //     reader.onerror = error => reject(error)
    // })

    const submit = async (e) => {

        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const photoUrl = 'https://iili.io/2UMxcu.png'

        // if(e.target.image.files.length > 0) {
        //     const base64 = await toBase64(e.target.image.files[0])
        //     const response = await axios.post('https://freeimage.host/api/1/upload', null, {params: {
        //         key:'KEY',
        //         source: base64,
        //         // action: 'upload',
        //     }})
        //     console.log(response.data)
        // }
        try {
            await axios.post('/api/user/signup', {
                firstName,
                lastName,
                email,
                password,
                photoUrl,
            })
            displayMessage('success', 'Account Succesfully Created!')
            history.push('/login')
        } catch(error) {
            console.error(error)
            displayMessage('error', error.toString())

        }

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
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                {/* <Form.Group>
                    <Form.File id="image" label="Profile Photo" />
                </Form.Group> */}
               
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
