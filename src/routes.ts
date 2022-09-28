import { Router } from 'express';
import "express-async-errors";
import joiValidation from './middlewares/joiValidation.js';
import { usuarioController } from './controllers/usuariosController.js';
import { cadastro } from './schemas/usuariosSchema.js';
const router = Router()

router.post('/cadastro', joiValidation(cadastro), usuarioController.cadastro)

export default router