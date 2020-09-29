import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    dev: process.env.NODE_ENV !== 'production',
    hostName: 'localhost',
    dbName: 'twitter',
    jwtSecret: process.env.JWT_SECRET_TOKEN
}