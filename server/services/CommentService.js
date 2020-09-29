import Comment from '../models/Comment.js'

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
    const res = await Comment.User.findByIdAndUpdate(id, comment, {new: true})
    return res
}

// deletes an existing comment on the guestbook
// INPUT: the id of the comment
// OUTPUT: the mongoose respone of the operation
const deleteComment = async (comment) => {
    const res = await Comment.deleteOne(id)
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
    const resUpdate = await Comment.User.findByIdAndUpdate(id, {
        $push: {
            replies: resInsert
        }
    }, {new: true})
    return {resInsert, resUpdate}
}

export default {
    addComment,
    editComment,
    deleteComment,
    reply
}

