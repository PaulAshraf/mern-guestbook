import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	password: {
		type: String,
		required: true,
	},
})

export default mongoose.model('User', Schema)