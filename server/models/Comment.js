import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
    user: {
		type: Object,
		required: true,
    },
    // the replies on a comment is an array of comments 
    // which is indicated by `[this]`
    // `this` refers to the comment class created by the `mongoose.Schema({})` class
    replies: {
		type: [this],
		default: []
    },
	isReply: {
		type: Boolean,
		default: false
	}
})

export default mongoose.model('Comment', Schema)