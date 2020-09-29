import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    dev: process.env.NODE_ENV !== 'production',
    hostName: 'guestbook.wwes5.mongodb.net',
    dbName: 'guestbook',
    dbUser:'PaulAshraf',
    dbPassword:process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET_TOKEN
}