
import { Response } from "express";


export function respostaServidor(res: Response, mensagem: any, status: number) {
    return res.status(status).json({
        mensagem: mensagem
    });
}