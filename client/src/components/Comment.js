import React, {useState} from 'react'
import {ObjectId} from 'mongodb'
import styled from 'styled-components'
import axios from 'axios'
import { Card, Container, Media, Row, Col } from 'react-bootstrap'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineComment } from 'react-icons/ai'
import loginService from '../services/login'
import Edit from './Edit'
import NewReply from './NewReply'
import ReplyComment from './ReplyComment'

const Comment = (props) => {

    // const imgurl =  'https://scontent.fcai20-2.fna.fbcdn.net/v/t1.0-9/71212107_10220336847750132_5293185109397078016_n.jpg?_nc_cat=110&_nc_sid=174925&_nc_ohc=Yk9Mvo7fPNMAX-MHpxf&_nc_ht=scontent.fcai20-2.fna&oh=135109bf590fed56827a20b0f807a292&oe=5FA53515'

    const comment = props.comment

    const [showEdit, setShowEdit] = useState(false)
    const [showReply, setShowReply] = useState(false)

    const handleModal = () => setShowEdit(!showEdit)
    const handleReply = () => setShowReply(!showReply)

    const deleteComment = async (id) => {
        const token = loginService.getCurrUserToken()
        try {
            await axios.delete(`/api/comment/${id}`, {
                headers: 
                {
                    authorization: `Bearer ${token}`
                }
            })
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
            <Edit show={showEdit} id={comment._id} handleClose={handleModal} />
            <NewReply show={showReply} id={comment._id} handleClose={handleReply} />
            <Card>
                <Card.Body>
                    <Media>
                    <Image src={comment.user.photoUrl} alt={comment.user.firstName} />
                    <Media.Body> 
                    <Card.Title>{`${comment.user.firstName} ${comment.user.lastName}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{calcTime(comment._id)}</Card.Subtitle>
                    </Media.Body>
                    </Media>
                    <Container>
                        <Row >
                            <Col>
                                <Card.Text>{comment.text}</Card.Text>
                            </Col>
                            <Col md='auto' >
                                <Card.Link style={{verticalAlign: 'bottom'}} onClick={handleReply}><AiOutlineComment size='1.3em' style={{ color: '#252a34'}} /></Card.Link>
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
                {comment.replies.reverse().map(reply => <ReplyComment key={reply._id} parentId={comment._id} comment={reply}/>)}
            </Card>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`

const Image = styled.img`
    border-radius: 50%;
    width: 50px;
    margin-right: 20px;
    margin-bottom: 10px;
`

export default Comment
