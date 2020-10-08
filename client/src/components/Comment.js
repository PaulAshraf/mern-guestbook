import React from 'react'
import {ObjectId} from 'mongodb'
import styled from 'styled-components'
import { Card, Media } from 'react-bootstrap'

const Comment = (props) => {

    const imgurl =  'https://scontent.fcai20-2.fna.fbcdn.net/v/t1.0-9/71212107_10220336847750132_5293185109397078016_n.jpg?_nc_cat=110&_nc_sid=174925&_nc_ohc=Yk9Mvo7fPNMAX-MHpxf&_nc_ht=scontent.fcai20-2.fna&oh=135109bf590fed56827a20b0f807a292&oe=5FA53515'

    const comment = props.comment

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
                    return `${Math.floor(diff / 1e3)} seconds ago`
            }
        }
    }

    return (
        <Wrapper>
            <Card>
                <Card.Body>
                    <Media>
                    <Image src={imgurl} alt={comment._id} />
                    <Media.Body> 
                    <Card.Title>{`${comment.user.firstName} ${comment.user.lastName}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{calcTime(comment._id)}</Card.Subtitle>
                    </Media.Body>
                    </Media>
                    <Card.Text>{comment.text}</Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
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
    width: 10%;
    margin-right: 20px;
    margin-bottom: 10px;
`

export default Comment
