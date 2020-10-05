import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    dev: process.env.NODE_ENV !== 'production',
    //hostName: 'guestbook.wwes5.mongodb.net',
    hostName: 'guestbook-shard-00-00.wwes5.mongodb.net:27017,guestbook-shard-00-01.wwes5.mongodb.net:27017,guestbook-shard-00-02.wwes5.mongodb.net:27017',
    dbName: 'guestbook',
    dbUser:'PaulAshraf',
    dbPassword:process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET_TOKEN
}