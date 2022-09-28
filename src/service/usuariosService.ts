import { IUsuarios } from '../types/usuariosTypes.js'
import { usuarioRepository } from '../repositories/usuarioRepository.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

async function cadastroService(dados: Omit<IUsuarios, 'id'>) {
    const verificarEmail = await usuarioRepository.buscarEmail(dados.email)
    if (verificarEmail) {
        throw { type: 'conflict' }
    }
    const encriptarSenha = bcrypt.hashSync(dados.senha, 10);
    const obj = {
        email: dados.email,
        senha: encriptarSenha
    }
    await usuarioRepository.inserir(obj)
}

async function loginService(email: string, senha: string) {
    const buscarDados = await usuarioRepository.buscarEmail(email)
    if (!buscarDados) {
        throw { type: 'unauthorized' }
    }
    const verificarSenha = bcrypt.compareSync(senha, buscarDados.senha)
    if (!verificarSenha) {
        throw { type: 'unauthorized' }
    }
    const token = jwt.sign(buscarDados.id.toString(), process.env.SECRET)
    return token;
}

export const usuariosService = {
    cadastroService,
    loginService
}