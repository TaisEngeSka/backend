import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router ();
const controller = new UsuarioController();

router.post("/salvar", controller.salvar);


export default router;