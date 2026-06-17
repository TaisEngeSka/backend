import { CadastroInterface } from "../interfaces/Cadastro";
import { ProdutosInterface } from "../interfaces/ProdutosInterface";

export const senhaSalva = "password";
export const user = "username";

export const cadastros : CadastroInterface[] = [
    {
        codigo: 1,
        nome: "João",
        username: "joao",
        senha: "senha123",
        email: "joao@gmail.com",
        telefone: 11912345689
    },
    {
        codigo: 2,
        nome: "Ana",
        username: "ana",
        senha: "Senha456",
        email: "ana@gmail.com",
        telefone: 11912345678
    }
];
export const produtos: ProdutosInterface[] = [
    {
        descricao:"ração para cachorro",
        valor: 15.00,
    },
    {
        descricao: "ração para gato",
        valor: 15.00,
    },
    {
        descricao:"ração para passarinho",
        valor: 10.00,
    },
    {
        descricao: "ração para peixe",
        valor: 15.00,
    },
    {
        descricao: "ASDASDASDASD",
        valor: 15.00,
    },
]