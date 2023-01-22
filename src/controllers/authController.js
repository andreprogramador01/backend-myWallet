import db from '../config/db.js'
import joi from 'joi';
import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'
import cadastroSchema from '../schema/cadastroSchema.js';


export async function cadastro(req, res){
    const { name, email, password, confirmPassword } = req.body;

    
    const validation = cadastroSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }
    const passwordHashed = bcrypt.hashSync(password, 10)

    try {
        const userExists = await db.collection('users').findOne({ email })

        if (userExists) {
            return res.status(422).send("Esse email já está cadastrado em nosso banco de dados")
        }
        const UserInserted = await db.collection('users').insertOne({ name, email, password: passwordHashed })
        if (UserInserted) {
            return res.status(201).send("Usuário criado com sucesso")
        }
    } catch (error) {
        res.status(500).send("Ocorreu um erro no banco de dados")
    }


    res.sendStatus(201)
}
export async function login(req,res){
    const { email, password } = req.body

    const user = await db.collection('users').findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuidV4();
        try {
            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            })
            return res.send(token)
        } catch (error) {
            console.error(error)
            return res.status(500).send('Ocorreu um erro no banco de dados')
        }


    } else {
        res.status(422).send('Email e/ou senha incorreto(s)')
    }

}