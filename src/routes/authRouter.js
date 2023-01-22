import {Router} from 'express'
import {cadastro,login} from '../controllers/authController.js'
import schemaValidation from '../middlewares/schemaValidationMiddleware.js'
import cadastroSchema from '../schema/cadastroSchema.js'
import loginSchema from '../schema/loginSchema.js'


const authRouter = Router()


authRouter.post('/cadastro',schemaValidation(cadastroSchema), cadastro)
authRouter.post('/login',schemaValidation(loginSchema), login)

export default authRouter   