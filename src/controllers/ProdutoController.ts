import { Request, Response } from "express";
import { respostaServidor } from "../util/RespostaServidor";
import { ProdutoService } from "../services/ProdutoServoce";

const service = new ProdutoService();

export class ProdutoController {

    async buscarProdutos(req: Request, res: Response) {
        return respostaServidor(res, service.buscarProdutos(), 200);
    }
}
