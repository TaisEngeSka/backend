import express from "express";
import { senhaSalva, user, usuario } from "./data/Mock";
import cors from "cors";
import { LoginInterface } from "./interfaces/Login";
import { CadastroInterface } from "./interfaces/Cadastro";
import { Response } from "express";
import { EsqueciSenhaInterface } from "./interfaces/EsqueciSenha";
import router from "./routes/AuthRoute";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",   // seu frontend Vite
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json());
app.use("autenticacao", router);


// front 
// ANTES Service ("efetuarLogin")
//AGORA Service ("autenticacao/efetuarLogin")
//EX Service ("produto/efetuarLogin")
//EX Service ("Produto/cadastro")

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



function respostaServidor(res: Response, mensagem: any, status: number) {
  return res.status(status).json({
    mensagem: mensagem
  });
}

// POST
app.post("/efetuarLogin", (req, res) => {
  const { username, senha }: LoginInterface = req.body;

  if (user != username || senhaSalva != senha) {
    return respostaServidor(res, "Credenciais inválidas!", 401);
  }

  return respostaServidor(res, "Login bem-sucedido!", 200);
});

app.get("/esqueciSenha", (req, res) => {
  const { email, codigoVer }: EsqueciSenhaInterface = req.body;

  let encontreiSenha = false;
  for (let i of usuario) {
    if (i.email === email && i.codigo == codigoVer) {
      encontreiSenha = true;
    }
  }

  respostaServidor(res, encontreiSenha, 200);
});

// POST
app.post("/efetuarCadastro", (req, res) => {
  const { email, senha, username, telefone }: CadastroInterface = req.body;

  // Validar e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) {
    return respostaServidor(res, "E-mail inválido!", 400);
  }

  // Validar senha
  const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!senhaValida.test(senha)) {
    return respostaServidor(res, "A senha deve ter no mínimo 8 caracteres, uma letra e um número.", 400);
  }

  return respostaServidor(res, "Cadastro realizado com sucesso!", 200);
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});

