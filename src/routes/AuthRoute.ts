import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/efetuarLogin", (req, res) =>
  authController.login(req, res)
);

router.post("/efetuarCadastro", (req, res) =>
  authController.efetuarCadastro(req, res)
);

router.post("/esqueciSenhaPassoI", (req, res) =>
  authController.esqueciSenhaPassoI(req, res)
);

router.post("/esqueciSenhaPassoII", (req, res) =>
  authController.esqueciSenhaPassoII(req, res)
);

router.post("/esqueciSenhaPassoIII", (req, res) =>
  authController.esqueciSenhaPassoIII(req, res)
);

export default router;