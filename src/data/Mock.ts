import { CadastroInterface } from "../interfaces/Cadastro";

export const usuario = [
    {
        codigo: 1,
        nomeUsuario: "Alexandre",
        email: "alexandre@gmail.com",
        senha: "senha123"
    },

    {
        codigo: 2,
        nomeUsuario: "Maria",
        email: "maria@gmail.com",
        senha: "senha456"
    },

    {
        codigo: 3,
        nomeUsuario: "Pedro",
        email: "pedro@gmail.com",
        senha: "senha789"
    },

];

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
export const senhaSalva = "password";
export const user = "username";