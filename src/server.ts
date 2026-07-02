import express from "express";
import cors from "cors";
import autenticacao from "./routes/AuthRoute";
import ProdutoRoutes from "./routes/PodutoRoutes";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",   // seu frontend Vite
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json());
app.use("/produtos", ProdutoRoutes);
app.use("/autenticacao", autenticacao);

app.listen(PORT, () => {
  console.log(`Servidor rodando e m http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});