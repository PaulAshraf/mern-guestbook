import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import config from '../config.js'

// Returns the data of a specific user
// INPUT: the id of the user
// OUTPUT: the user's data
const viewUser = async (id) => {
    const res = await User.findById(id)
    if(!res)
        throw {error: 'No user with this id'}
    return res
}

// Creates a new user 
// Hashes the password with bcrypt
// INPUT: the new user data
// OUTPUT: the mongoose respone of the operation
const signUp = async (user) => {

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(user.password, salt)

    user.password = hashedPassword

    const res = await User.insertMany(user)
    return res
    
}

// logs a user into the guestbook
// compares the password with the hashed password with bcrypt, if valid => a valid JWT is generated
// INPUT: the email and password of the user logging in
// OUTPUT: a valid JWT token, to be used for authorization, and containes a payload of the user data
const logIn = async (email, password) => {

    const user = await User.findOne({ email })
    if(!user)
        throw {error: 'No user with this email'}

    const correct = await bcrypt.compare(password, user.password)
    if (!correct) 
        throw {error: 'Invalid password'}

    const token = jwt.sign({ user }, config.jwtSecret)
    return {token}




}

export default {
    viewUser,
    signUp,
    logIn,
}

