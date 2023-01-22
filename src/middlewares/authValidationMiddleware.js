import db from '../config/db.js'

export async function authValidation(req,res,next) {

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    
    if (!token) {
        return res.sendStatus(401)
    }
    try {
        const session = await db.collection('sessions').findOne({ token })
        if (!session) {
            return res.sendStatus(401)
        }
        res.locals.sessao = session
    } catch (err) {
        console.log(err)
        res.status(500).send('Ocorreu um erro no servidor')
    }
    
    next()
}
