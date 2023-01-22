import express from 'express';
import joi from 'joi';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid'
import authRouter from './routes/authRouter.js'
import transactionRouter from './routes/transactionRouter.js';


const PORT = 5000
const app = express()


app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(transactionRouter)


app.listen(5000)

