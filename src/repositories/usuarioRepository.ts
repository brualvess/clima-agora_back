import { IUsuarios } from "../types/usuariosTypes.js";
import { prisma } from '../database.js';

async function inserir(dados: Omit<IUsuarios, 'id'>) {
    await prisma.usuarios.create({ data: dados })
}

async function buscarEmail(email: string) {
    const resultado = await prisma.usuarios.findFirst({ where: { email } })
    return resultado;
}

export const usuarioRepository = {
    inserir,
    buscarEmail
}