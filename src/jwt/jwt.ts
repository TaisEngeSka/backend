import jwt from "jsonwebtoken";
import "dotenv/config";

const SENHA_JWT = process.env.SENHA_JWT  || "";

export function gerarToken(codigoUsuario: number): string {
  return jwt.sign(
    {
      usuario: codigoUsuario,
      email: "gsdugcugdu"
    },
    SENHA_JWT,
    {
      expiresIn: "1h"
    }
  );
}

export function validarToken(token: string) {
  let retorno = false;

  try {

    const dados:any = jwt.verify(token, SENHA_JWT);
    retorno = dados.usuario > 0;

  } catch (error) {

    console.log("Erro ao validar token:");

  }
  return retorno;
}
