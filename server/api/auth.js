import jwt from 'jsonwebtoken'

import config from '../config.js'

export default (req, res, next) => {
	const header = req.header('Authorization')
	const token = header && header.split(' ')[1]
	if (!token) {
		return res.status(400).json({ error: 'No token' })
	}

	try {
		const verified = jwt.verify(token, config.jwtSecret)
		if (!verified) {
			return res.status(400).json({ error: 'Invalid token' })
		}
		req.username = verified.username
		next()
	} catch (err) {
		console.error(err)
		return res.status(400).json({ error: err })
	}

}
