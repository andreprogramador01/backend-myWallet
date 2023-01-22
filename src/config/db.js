import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'

dotenv.config()
let db

const mongoClient = new MongoClient(process.env.DATABASE_URL)
 
try {
    await mongoClient.connect()
    db = mongoClient.db()
} catch (error) {
    console.error(error)
}

export default db