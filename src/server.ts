import express from "express";
import { usuario } from "./data/Mock";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/efetuarLogin", (requisicao, resposta) => {
  const user = {
    idade: 17,
    nome: "Taís",
    sobrenome: "Santos",
    cpf: "123.456.789-00",
  };

  return resposta.status(200).json(user);
});
 
app.get("/ListaUsers", (req, res) => {
  return res.status(200).json(usuario);
});

// DELETE OU GET
app.get("/istaUsers/:codigo", (req, res) => {
  const codigo = req.params.codigo;
  return res.status(200).json({mensagem: "VOCÊ DIGITOU " + codigo});
});

app.get("/Exercicio/:codigo", (req, res) => {
  const codigo = req.params.codigo;

  if (codigo == null || codigo == ""){
      return res.status(200).json(usuario);
  } 
  
  for {
    return res.status(200).json(usuario[codigo - 1]);
  }
});

app.get("/exercicio/:codigo", (req, res) => {
  const codigo = req.params.codigo;

  if (codigo == null || codigo == ""){
      return res.status(200).json(usuario);
  } else {
    return res.status(200).json(usuario[codigo - 1]);
  }
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});