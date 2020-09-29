import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import config from './server/config.js'
import userController from './server/api/user.js'
import commentController from './server/api/comment.js'

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

app.use('/api/user', userController)
app.use('/api/comment', commentController)

mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.hostName}/${config.dbName}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('✔️ Connected to MongoDB'))
    .catch((err) => console.error(err))

const port = config.port || 8000
app.listen(port, () => {
    console.log(`✔️ listening on port ${port}`)
})
