import { LoginInterface } from "../interfaces/Login";
import { cadastros } from "../data/Mock";
import { CadastroInterface } from "../interfaces/Cadastro";
import { gerarToken } from "../server";
import { buscarUsuarioNoBD } from "../repository/AuthRepository";
import { RetornoLoginInterface } from "../interfaces/RetornoLogin";

export class AuthService {
  private codigoVerificacao = "123456";

  async login({ username, senha }: LoginInterface) {

    const retorno: RetornoLoginInterface | null = await buscarUsuarioNoBD(username, senha);

    if (retorno !== null) {

      const token = gerarToken(retorno.id);

      return {
        mensagem: "Login realizado com sucesso!",
        token: token
      };
    }
    return { mensagem: "Usuário não encontrado!" };
  }


  // atualizar o cadastro implementando a função cadastroUserNoBancoDados
  // do AuthRepository.ts

  efetuarCadastro({
    nome,
    username,
    senha,
    email,
    telefone,
  }: CadastroInterface): string {
    const usernameJaExiste = cadastros.some(
      (cadastro) => cadastro.username === username
    );

    if (usernameJaExiste) {
      return "Username já cadastrado!";
    }

    const emailJaExiste = cadastros.some(
      (cadastro) => cadastro.email === email
    );

    if (emailJaExiste) {
      return "E-mail já cadastrado!";
    }

    const telefoneJaExiste = cadastros.some(
      (cadastro) => cadastro.telefone === telefone
    );

    if (telefoneJaExiste) {
      return "Telefone já cadastrado!";
    }

    const novoCadastro: CadastroInterface = {
      nome,
      username,
      senha,
      email,
      telefone,
    };

    cadastros.push(novoCadastro);

    return "Cadastro realizado com sucesso!";
  }





  esqueciSenhaPassoI(email: string): boolean {
    const emailEncontrado = cadastros.some(
      (cadastro) => cadastro.email === email
    );

    return emailEncontrado;
  }

  esqueciSenhaPassoII(email: string, codigoVer: string): boolean {
    const emailEncontrado = cadastros.some(
      (cadastro) => cadastro.email === email
    );

    const codigoValido = codigoVer === this.codigoVerificacao;

    return emailEncontrado && codigoValido;
  }

  esqueciSenhaPassoIII(
    email: string,
    codigoVer: string,
    novaSenha: string
  ): boolean {
    const codigoValido = codigoVer === this.codigoVerificacao;

    if (!codigoValido) {
      return false;
    }

    const usuarioEncontrado = cadastros.find(
      (cadastro) => cadastro.email === email
    );

    if (!usuarioEncontrado) {
      return false;
    }

    usuarioEncontrado.senha = novaSenha;

    return true;
  }
}
