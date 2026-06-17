import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();
const controller = new ProdutoController();
router.get("/buscarProdutos", controller.buscarProdutos);

export default router;