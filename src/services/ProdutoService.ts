import { produtos } from "../data/Mock";
import { ProdutosInterface } from "../interfaces/ProdutosInterface";
import { respostaServidor } from "../util/RespostaServidor";


export class ProdutoService {
    buscarProdutos(): ProdutosInterface[] {
        return produtos;
    }

    buscarProdutosPesquisa(pesquisa: string): ProdutosInterface[] {

        let encontreiProduto: ProdutosInterface | null = null;
        for (let i of produtos) {
            if (i.descricao === pesquisa) {
                encontreiProduto = i;
            }
        }

        if (!encontreiProduto) {
            return [];
        }

        return [encontreiProduto];
    }
}