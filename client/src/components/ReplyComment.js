import React, {useState} from 'react'
import {ObjectId} from 'mongodb'
import styled from 'styled-components'
import axios from 'axios'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import loginService from '../services/login'
import EditReply from './EditReply'

const ReplyComment = (props) => {

    const comment = props.comment
    const parentId = props.parentId

    const [showEdit, setShowEdit] = useState(false)

    const handleModal = () => setShowEdit(!showEdit)

    const deleteComment = async (id) => {
        const token = loginService.getCurrUserToken()
        try {
            const response = await axios.delete(`/api/comment/reply/${id}/${parentId}`, {
                headers: 
                {
                    authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)
        }
        catch(error) {
            console.error(error)
        }
    } 

    const calcTime = (id) => {
        const oldDate = new Date(ObjectId(id).getTimestamp())
        const nowDate = new Date()
        const diff = nowDate - oldDate
        if (diff > 86400e3) 
            return `${Math.floor(diff / 86400e3)} days ago`
        else{
            if (diff > 3600e3)
                return `${Math.floor(diff / 3600e3)} hours ago`
            else {
                if (diff > 60e3) 
                    return `${Math.floor(diff / 60e3)} minutes ago`
                else
                    return `few seconds ago`
            }
        }
    }

    return (
        <Wrapper>
            <EditReply show={showEdit} id={comment._id} handleClose={handleModal} parentId={parentId}/>
            <Card>
                <Card.Body>
 
                    <Card.Title>{`${comment.user.firstName} ${comment.user.lastName}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{calcTime(comment._id)}</Card.Subtitle>

                    <Container>
                        <Row >
                            <Col>
                                <Card.Text>{comment.text}</Card.Text>
                            </Col>
                            <Col md='auto' >
                                {
                                    loginService.getCurrUserData() && loginService.getCurrUserData()._id === comment.user._id ? <>
                                    <Card.Link style={{verticalAlign: 'bottom'}} onClick={handleModal}><AiOutlineEdit    size='1.3em' style={{ color: '#252a34'}} /></Card.Link>
                                    <Card.Link style={{verticalAlign: 'bottom'}} onClick={() => deleteComment(comment._id)}><AiOutlineDelete  size='1.3em' style={{ color: '#252a34'}} /></Card.Link>
                                    </> : <></> 
                                    
                                }
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export default ReplyComment
