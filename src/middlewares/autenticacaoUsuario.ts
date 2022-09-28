import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";

dotenv.config();


export async function autenticarUsuario(req: Request, res: Response, next: NextFunction) {

	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	if (!token) return res.sendStatus(401);

	const secret_key = process.env.SECRET;

	try {
		jwt.verify(token, secret_key, (err, idUsuario: string) => {
			if (err) return res.sendStatus(403);
			req.body.idUsuario = parseInt(idUsuario);
			next();
		});
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}
