import { Request, Response } from "express";
import { respostaServidor } from "../util/RespostaServidor";
import { ProdutoService } from "../services/ProdutoService";
import { ProdutosInterface } from "../interfaces/ProdutosInterface";

const service = new ProdutoService();

export class ProdutoController {

    async buscarProdutos(req: Request, res: Response) {
        return respostaServidor(res, service.buscarProdutos(), 200);
    };

    async buscarProdutosPesquisa(req: Request, res: Response) {
        const { pesquisa } = req.query; // somente em get ou post 

        if (pesquisa == null || pesquisa == "") {
            return respostaServidor(res, service.buscarProdutos(), 200);
        }

        return respostaServidor(res, service.buscarProdutosPesquisa(pesquisa as string), 200);
    };
    
    async CadastrarProduto(frontend: Request, backend: Response) {
        const {descricao, valor} = frontend.body;

        const dados : ProdutosInterface = {
            descricao: String(descricao),
            valor: Number(valor)
        }

        if (dados.descricao == null || dados.descricao == "" || dados.valor == null || dados.valor == 0) {
            return respostaServidor(backend, "Descrição e valor são obrigatórios", 400);
        }

        return respostaServidor(backend, service.cadastrarProduto(dados), 200);
    };

}
