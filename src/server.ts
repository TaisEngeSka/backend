import express from "express";
import { senha, user, usuario } from "./data/Mock";
import cors from "cors";
import { LoginInterface } from "./interfaces/Login";
import { CadastroInterface } from "./interfaces/Cadastro";
import { RespostaServidorInterface } from "./interfaces/Retorno";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",   // seu frontend Vite
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// POST
app.post("/efetuarLogin", (req, res) => {
  const { username, senha }: LoginInterface = req.body;


  let resposta: RespostaServidorInterface = { mensagem: "Login bem-sucedido!" }
  let status = 200;

  if (user != username || senha != senha) {
    status = 401;
    resposta.mensagem = "Credenciais inválidas!";
  }

  return res.status(status).json(resposta);
});

// POST
app.post("/efetuarCadastro", (req, res) => {
  const { email, senha, username, telefone }: CadastroInterface = req.body;

  // Validar e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) {
    return res.status(400).json({
      mensagem: "E-mail inválido!"
    });
  }

  // Validar senha
  const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!senhaValida.test(senha)) {
    return res.status(400).json({
      mensagem: "A senha deve ter no mínimo 8 caracteres, uma letra e um número."
    });
  }

  return res.status(200).json({
    mensagem: "Cadastro realizado com sucesso!"
  });
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});