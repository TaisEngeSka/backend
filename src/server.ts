import express from "express";
import { senha, user, usuario } from "./data/Mock";
import cors from "cors";

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
  const { nomeUser, senhaUser } = req.body;

  if (user === nomeUser && senha === senhaUser) {
    return res.status(200).json({ mensagem: "Login bem-sucedido!" });
  }

  return res.status(401).json({ mensagem: "Credenciais inválidas!" });
});

// POST
app.post("/efetuarCadastro", (req, res) => {
  const { email, senhaUser, ConfirmaSenha, nomeUser, foneContato } = req.body;

  // Validar e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) {
    return res.status(400).json({
      mensagem: "E-mail inválido!"
    });
  }

  // Validar senha
  const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!senhaValida.test(senhaUser)) {
    return res.status(400).json({
      mensagem: "A senha deve ter no mínimo 8 caracteres, uma letra e um número."
    });
  }

  // Confirmar senha
  if (ConfirmaSenha !== senhaUser) {
    return res.status(400).json({
      mensagem: "As senhas não coincidem!"
    });
  }

  return res.status(200).json({
    mensagem: "Cadastro realizado com sucesso!"
  });
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});