import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {Button, Spinner} from 'react-bootstrap'
import Comment from '../components/Comment'
import New from '../components/New'
import axios from 'axios'
import styled from 'styled-components'
import loginService from '../services/login'

const Feed = () => {

    const history = useHistory()

    const [showNew, setShowNew] = useState(false)

    const handleModal = () => setShowNew(!showNew)
    const openNew = () => {
        if(loginService.getCurrUserData())
            handleModal()
        else
            history.push('/login')
    }

    const [comments, setComments] = useState([])
    useEffect(() => {
        const fetchComments = async () => {
            try{
                const response = await axios.get('/api/comment/all')
                setComments(response.data.reverse())
            }
            catch(error){
                console.error(error)
            }
        }

        fetchComments()
    })

    return (
        <Wrapper>
            <Button variant='light' block onClick={openNew}>Add Comment</Button>
            <New handleClose={handleModal} show={showNew}></New>
            {comments.length === 0 ? <SpinnerWrapper><Spinner animation="border" /></SpinnerWrapper> : 
            comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 60%;
    @media (max-width: 600px){
        width: 95%;
    }
    margin: auto;
    margin-top: 30px;
`
const SpinnerWrapper = styled.div`
    width: fit-content;
    margin: auto;
    margin-top: 20px;
    color: #ff2e63;
`

export default Feed
