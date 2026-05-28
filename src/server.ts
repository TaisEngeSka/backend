import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/efetuarLogin", (requisicao, resposta) => {
  resposta.send("TA FUNCIONANDOOO!!");
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});