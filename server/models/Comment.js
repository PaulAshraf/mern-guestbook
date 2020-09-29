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
    replies: {
        type: [this]
    },
	time: {
		type: Date,
		default: Date.now,
	}
})

export default mongoose.model('Comment', Schema)