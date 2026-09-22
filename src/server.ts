import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import autenticacao from "./routes/AuthRoute";
import ProdutoRoutes from "./routes/ProdutoRoutes";
import UsuarioRoutes from "./routes/UsuarioRoutes";

// valida quem chama e quais métodos podem chamar a API, e quais headers podem ser enviados 

const app = express();
const PORT = process.env.PORTA ?? 3000;

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
app.use("/usuario", UsuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});