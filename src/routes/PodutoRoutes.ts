import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { produtos } from "../data/Mock";

const router = Router();
const controller = new ProdutoController();

router.get("/buscarProdutos", controller.buscarProdutosPesquisa);

export default router;