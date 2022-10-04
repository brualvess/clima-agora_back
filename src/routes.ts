import { Router } from 'express';
import "express-async-errors";
import joiValidation from './middlewares/validacaoJoi.js';
import { usuarioController } from './controllers/usuariosController.js';
import {
    cadastro,
    login
} from './schemas/usuariosSchema.js';
import { climaController } from './controllers/climaController.js';

const router = Router()

router.post('/cadastro', joiValidation(cadastro), usuarioController.cadastro);
router.post('/login', joiValidation(login), usuarioController.login);
router.get('/', climaController.clima);

export default router