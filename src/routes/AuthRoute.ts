import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/efetuarLogin", authController.login);
router.post("/efetuarCadastro", authController.cadastro);
export default router;
