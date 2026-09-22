import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

const service = new UsuarioService();

// Lógica para salvar o usuário
export class UsuarioController {
    async salvar (req: Request, res: Response){
        const {nome} = req.body;

        if (nome != null || nome != ""){
            return res.status(200).json(await service.salvar(nome)); // sucesso
        } else {
            return res.status(400).json({mensagem: "Usuário não encontrado."}); // erro
        }

        // req.body == requisicoes post
        // req.query == requisicoes get
        // req.params == requisicoes put/get
    } 
}