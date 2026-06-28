import { Request, Response } from "express";
import { respostaServidor } from "../util/RespostaServidor";
import { ProdutoService } from "../services/ProdutoService";
import { ProdutosInterface } from "../interfaces/ProdutosInterface";

const service = new ProdutoService();

export class ProdutoController {
  async buscarProdutos(req: Request, res: Response) {
    return respostaServidor(res, service.buscarProdutos(), 200);
  }

  async buscarProdutosPesquisa(req: Request, res: Response) {
    const { pesquisa } = req.query;

    if (pesquisa == null || pesquisa == "") {
      return respostaServidor(res, service.buscarProdutos(), 200);
    }

    return respostaServidor(
      res,
      service.buscarProdutosPesquisa(pesquisa as string),
      200
    );
  }

  async cadastrarProduto(req: Request, res: Response) {
    const { descricao, valor } = req.body;

    if (!descricao || !valor) {
      return respostaServidor(
        res,
        "Descrição e valor são obrigatórios",
        400
      );
    }

    const dados: ProdutosInterface = {
      descricao: String(descricao),
      valor: Number(valor),
    };

    if (dados.valor <= 0) {
      return respostaServidor(res, "O valor deve ser maior que zero", 400);
    }

    return respostaServidor(res, service.cadastrarProduto(dados), 200);
  }
}
