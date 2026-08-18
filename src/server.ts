import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import autenticacao from "./routes/AuthRoute";
import ProdutoRoutes from "./routes/ProdutoRoutes";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORTA ?? 3000;
const SENHA_JWT = process.env.SENHA_JWT;

export function gerarToken(codigoUsuario: number) {
  return jwt.sign( // Header.Playload.Ass
    {
      usuario: codigoUsuario,
      email: "gsdugcugdu"
    }, //  Playload
    SENHA_JWT, // header
    {
      expiresIn: "1h" // tempo de expiração do token
    } // Ass 
  )
}

export function validarToken(token: string) {
  let retorno = false;

  try {

    const dados = jwt.verify(token, SENHA_JWT);
    retorno = dados.usuario > 0;

  } catch (error) {

    console.log("Erro ao validar token:");

  }
  return retorno;
}

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

app.use(
  cors({
    origin: "http://localhost:5173", // seu frontend Vite
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/produtos", ProdutoRoutes);
app.use("/autenticacao", autenticacao);

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
