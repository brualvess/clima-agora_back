import joi from 'joi';
export const cadastro = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required(),
    confirmarSenha: joi.ref('senha')
});
export const login = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required(),
})
