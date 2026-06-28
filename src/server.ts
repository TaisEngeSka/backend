import express from "express";
import { cadastros, senhaSalva, user } from "./data/Mock";
import cors from "cors";
import { LoginInterface } from "./interfaces/Login";
import { CadastroInterface } from "./interfaces/Cadastro";
import { Response } from "express";
import { EsqueciSenhaInterface } from "./interfaces/EsqueciSenha";
import autenticacao from "./routes/AuthRoute";
import ProdutoRoutes from "./routes/ProdutoRoutes";

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

function respostaServidor(res: Response, mensagem: any, status: number) {
  return res.status(status).json({
    mensagem: mensagem,
  });
}

app.post("/efetuarLogin", (req, res) => {
  const { username, senha }: LoginInterface = req.body;

  if (!username || !senha) {
    return respostaServidor(res, "Credenciais inválidas!", 401);
  }

  if (user != username || senhaSalva != senha) {
    return respostaServidor(res, "Credenciais inválidas!", 401);
  }

  return respostaServidor(res, "Login bem-sucedido!", 200);
});

app.get("/esqueciSenha", (req, res) => {
  const { email, codigoVer }: EsqueciSenhaInterface = req.body;

  if (!email || !codigoVer) {
    return respostaServidor(res, "E-mail e código são obrigatórios!", 400);
  }

  let encontreiSenha = false;
  for (let i of cadastros) {
    if (i.email === email && i.codigo == codigoVer) {
      encontreiSenha = true;
    }
  }

  respostaServidor(res, encontreiSenha, 200);
});

app.post("/efetuarCadastro", (req, res) => {
  const { email, senha, username, telefone }: CadastroInterface = req.body;

  if (!email || !senha || !username || !telefone) {
    return respostaServidor(res, "Todos os campos são obrigatórios!", 400);
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) {
    return respostaServidor(res, "E-mail inválido!", 400);
  }

  const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!senhaValida.test(senha)) {
    return respostaServidor(
      res,
      "A senha deve ter no mínimo 8 caracteres, uma letra e um número.",
      400
    );
  }

  return respostaServidor(res, "Cadastro realizado com sucesso!", 200);
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});
