import express from "express";
import cors from "cors";
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

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
