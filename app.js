import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import config from './server/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/status', (_, res) => {
    return res.status(200).send('Server is up ✔️')
})

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

const port = config.port || 8000
app.listen(port, () => {
    console.log(`✔️ listening on port ${port}`)
})