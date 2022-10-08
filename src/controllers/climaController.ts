import { Request, Response } from "express";
import{climaService} from '../service/climaService.js'

async function clima(req: Request, res: Response) {
    const cidade = req.query.cidade
    const retorno = await climaService.clima(cidade)
    res.status(200).send(retorno)
}

export const climaController = {
    clima
}