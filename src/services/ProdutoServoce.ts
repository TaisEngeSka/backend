import {  produtos } from "../data/Mock";
import { ProdutosInterface } from "../interfaces/ProdutosInterface";


export class ProdutoService {
    buscarProdutos(): ProdutosInterface[] {
        return produtos;
    }
}