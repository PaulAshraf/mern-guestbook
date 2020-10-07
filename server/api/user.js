import express from 'express'
const router = express.Router()

import UserService from '../services/UserService.js'

router.get('/:id', async (req, res) => {

	const id = req.params.id

	try {
		const user = await UserService.viewUser(id)
		res.status(200).json(user)
	}
	catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}

})

router.post('/signup', async (req, res) => {

	const data = req.body

	try {
		const response = await UserService.signUp(data)
		res.status(200).json(response)
	}
	catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}

})

router.post('/login', async (req, res) => {

	const email = req.body.email
	const password = req.body.password

	try {
        const user = await UserService.logIn(email, password)
        res.status(200).json(user)
	} catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }
})

export default router