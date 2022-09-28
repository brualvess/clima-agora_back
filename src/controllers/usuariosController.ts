import { Request, Response } from "express";
import { usuariosService } from '../service/usuariosService.js'
async function cadastro(req: Request, res: Response) {
    const { email, senha } = req.body
    const obj = {
        email,
        senha
    }
    await usuariosService.cadastroService(obj)
    res.status(201).send('Usuário criado com sucesso!')
}

async function login(req: Request, res: Response){
    const{email, senha} = req.body
        const resultado = await usuariosService.loginService(email, senha)
    res.status(200).send(resultado)
}
export const usuarioController = {
    cadastro,
    login
}