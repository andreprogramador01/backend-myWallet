import joi from 'joi'
import db from '../config/db.js'
import {v4 as uuidV4} from 'uuid'
import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { ObjectId } from 'mongodb'


export async function novaTransacao(req,res){
    const session = res.locals.sessao
    const { value, description, type } = req.body
   try{
        await db.collection('wallet').insertOne({ userId: session.userId, value:Number(value), description, type,date:dayjs().format('DD/MM') })
        res.status(201).send('nova transação criada com sucesso')
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}
export async function pegarTodasTransacoesPorUsuario(req,res){
    const session = res.locals.sessao

    try {
        const transacoes = await db.collection('wallet').find({userId: session.userId}).toArray()
        const user = await db.collection('users').findOne({_id: ObjectId(session.userId)})
        res.send({transacoes,user})
    } catch (error) {
        
    }
}