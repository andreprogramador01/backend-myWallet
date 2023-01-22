import {novaTransacao, pegarTodasTransacoesPorUsuario} from '../controllers/transactionController.js'
import {Router} from 'express'
import schemaValidation from '../middlewares/schemaValidationMiddleware.js'
import transactionSchema from '../schema/transactionSchema.js'
import { authValidation } from '../middlewares/authValidationMiddleware.js'



const transactionRouter = Router()

transactionRouter.post('/nova-transacao', schemaValidation(transactionSchema), authValidation, novaTransacao)
transactionRouter.post('/todas-transacoes', authValidation, pegarTodasTransacoesPorUsuario)

export default transactionRouter    
