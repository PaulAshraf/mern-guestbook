import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
    user: {
		type: String,
		required: true,
    },
    // the replies on a comment is an array of comments 
    // which is indicated by `[this]`
    // `this` refers to the comment class created by the `mongoose.Schema({})` class
    replies: {
		type: [this],
		default: []
    },
    // adds the time of creation of the comment
	time: {
		type: Date,
		default: Date.now(),
	},
	isReply: {
		type: Boolean,
		default: false
	}
})

export default mongoose.model('Comment', Schema)