import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/efetuarLogin", (req, res) =>
    authController.login(req, res)
);

router.post("/efetuarCadastro", (req, res) =>
    authController.cadastro(req, res)
);
export default router;
