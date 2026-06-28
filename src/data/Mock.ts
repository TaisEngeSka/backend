import { CadastroInterface } from "../interfaces/Cadastro";
import { ProdutosInterface } from "../interfaces/ProdutosInterface";

export const senhaSalva = "password";
export const user = "username";

export const cadastros: CadastroInterface[] = [
  {
    nome: "João",
    username: "joao",
    senha: "senha123",
    email: "joao@gmail.com",
    telefone: 11912345689,
  },
  {
    nome: "Ana",
    username: "ana",
    senha: "Senha456",
    email: "ana@gmail.com",
    telefone: 11912345678,
  },
  {
    nome: "Carlos",
    username: "carlos",
    senha: "Senha789",
    email: "carlos@gmail.com",
    telefone: 11912345678,
  },
  {
    nome: "Maria",
    username: "maria",
    senha: "Senha012",
    email: "maria@gmail.com",
    telefone: 11912345678,
  },
  {
    nome: "Pedro",
    username: "pedro",
    senha: "Senha345",
    email: "pedro@gmail.com",
    telefone: 11912345678,
  },
];

export const produtos: ProdutosInterface[] = [
  {
    descricao: "ração para cachorro",
    valor: 15.0,
  },
  {
    descricao: "ração para gato",
    valor: 15.0,
  },
  {
    descricao: "ração para passarinho",
    valor: 10.0,
  },
  {
    descricao: "ração para peixe",
    valor: 15.0,
  },
  {
    descricao: "ASDASDASDASD",
    valor: 15.0,
  },
];
