import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();
const controller = new ProdutoController();

router.get("/buscarProdutos", controller.buscarProdutosPesquisa);
router.post("/cadastrarProduto", controller.CadastrarProduto);

export default router;