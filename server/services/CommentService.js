import Comment from '../models/Comment.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// Views all comments the guestbook
// OUTPUT: All the comments on the guestbook
const viewAllComments = async () => {
    const res = await Comment.find({isReply: false})
    return res
}

// Adds a new comment to the guestbook
// INPUT: the data of the comment
// OUTPUT: the mongoose respone of the operation
const addComment = async (comment) => {
    const res = await Comment.insertMany(comment)
    return res
}

// edits an existing comment on the guestbook
// INPUT: the id of the comment, the new data
// OUTPUT: the mongoose respone of the operation
const editComment = async (id, comment) => {
    const res = await Comment.findByIdAndUpdate(id, comment, {new: true})
    if(!res)
        throw {error: 'No comment with this id'}
    return res
}

// deletes an existing comment on the guestbook
// INPUT: the id of the comment
// OUTPUT: the mongoose respone of the operation
const deleteComment = async (id) => {
    const res = await Comment.deleteOne({_id: id})
    if(!res)
        throw {error: 'No comment with this id'}
    return res
}

// Replies to an existing comment on the guestbook
// It first creates a new comment with the isReply flag UP
// then it pushes this comment into the replies array of the existig comment
// INPUT: the id of the comment, the data of the new comment
// OUTPUT: the mongoose respone of the two operations
const reply = async (id, comment) => {
    comment.isReply = true
    const resInsert = await Comment.insertMany(comment)
    const resUpdate = await Comment.findByIdAndUpdate(id, {
        $push: {
            replies: resInsert
        }
    }, {new: true})
    return {resInsert, resUpdate}
}

const deleteReply = async (replyId, commentId) => {
    const resDelete = await Comment.deleteOne({_id: replyId})
    const resDeleteArray = await Comment.findByIdAndUpdate(commentId, {
        $pull: {
            replies: { _id: ObjectId(replyId)}
        }
    }, {new: true})
    return {resDelete, resDeleteArray}
}

const updateReply = async (replyId, commentId, comment) => {
    const resUpdate = await Comment.findByIdAndUpdate(replyId, comment, {new: true})
    const resUpdateArray = await Comment.updateOne({_id: ObjectId(commentId), 'replies._id':ObjectId(replyId)}, {
        $set: {
            'replies.$.text': comment.text
        }
    }, {new: true})
    return {resUpdate, resUpdateArray}
}

export default {
    viewAllComments,
    addComment,
    editComment,
    deleteComment,
    reply,
    deleteReply,
    updateReply,
}

