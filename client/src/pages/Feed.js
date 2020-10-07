import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import Comment from '../components/Comment'
import axios from 'axios'
import styled from 'styled-components'

const Feed = () => {

    const [comments, setComments] = useState([])
    useEffect(() => {
        const fetchComments = async () => {
            try{
                const response = await axios.get('/api/comment/all')
                setComments(response.data)
            }
            catch(error){
                console.error(error)
            }
        }

        fetchComments()
    })

    return (
        <Wrapper>
            <Button variant='light' block>Add Comment</Button>
            {comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 60%;
    margin: auto;
    margin-top: 30px;
`

export default Feed
