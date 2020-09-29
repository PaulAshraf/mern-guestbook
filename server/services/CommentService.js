import Comment from '../models/Comment.js'

// Views all comments the guestbook
// OUTPUT: All the comments on the guestbook
const viewAllComments = async () => {
    const res = await Comment.find({})
    return res
}

// Adds a new comment to the guestbook
// INPUT: the data of the comment
// OUTPUT: the mongoose respone of the operation
const addComment = async (comment) => {
    const res = await Comment.insertMany(comment)
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
    const res = await Comment.User.findByIdAndUpdate(id, comment, {new: true})
    if(!res)
        throw {error: 'No comment with this id'}
    return res
}

// deletes an existing comment on the guestbook
// INPUT: the id of the comment
// OUTPUT: the mongoose respone of the operation
const deleteComment = async (id) => {
    const res = await Comment.deleteOne(id)
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
    const resUpdate = await Comment.User.findByIdAndUpdate(id, {
        $push: {
            replies: resInsert
        }
    }, {new: true})
    return {resInsert, resUpdate}
}

export default {
    viewAllComments,
    addComment,
    editComment,
    deleteComment,
    reply
}

