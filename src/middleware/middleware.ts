import { NextFunction, Request, Response } from "express";
import { validarToken } from "../jwt/jwt";

// Middleware para validar o token JWT
export function middleware(requisicao: Request, resposta: Response, proximaFuncao: NextFunction) {

  const authorization = requisicao.headers.authorization;

  if (!authorization) {
    console.log("Não existe autorização");
    return resposta.status(401).json({ mensagem: "Não autorizado" });
  }

  if (validarToken(authorization)) {
    proximaFuncao();
  } else {
    console.log("Token inválido");
    return resposta.status(401).json({ mensagem: "Token inválido" });
  }
}
