import { Request, Response } from "express";
import{climaService} from '../service/climaService.js'

async function clima(req: Request, res: Response) {
    const retorno = await climaService.clima()
    res.status(200).send(retorno)
}

export const climaController = {
    clima
}