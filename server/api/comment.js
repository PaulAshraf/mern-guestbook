import express from 'express'
const router = express.Router()

import auth from './auth.js'
import CommentSerivce from '../services/CommentService.js'

router.get('/all', async (_, res) => {

	try {
		const comments = await CommentSerivce.viewAllComments()
		res.status(200).json(comments)
	}
	catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}

})

router.post('/', auth, async (req, res) => {

    const data = req.body
    data.user = req.user

	try {
		const response = await CommentSerivce.addComment(data)
		res.status(200).json(response)
	}
	catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}

})

router.put('/:id', auth, async (req, res) => {

    const id = req.params.id
    const data = req.body

	try {
		const comment = await CommentSerivce.editComment(id, data)
		res.status(200).json(comment)
	}
	catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}

})


router.delete('/:id', auth, async (req, res) => {

	const id = req.params.id

	try {
		const response = await CommentSerivce.deleteComment(id)
		res.status(200).json(response)
	}
	catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}

})


router.post('/reply/:id', auth, async (req, res) => {

	const id = req.params.id
    const data = req.body

	try {
        const response = await CommentSerivce.reply(id, data)
        res.status(200).json(response)
	} catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }
})

export default router