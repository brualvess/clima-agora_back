import { IUsuarios } from '../types/usuariosTypes.js'
import { usuarioRepository } from '../repositories/usuarioRepository.js'
import bcrypt from 'bcrypt';

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

export const usuariosService = {
    cadastroService
}