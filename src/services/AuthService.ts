import { LoginInterface } from "../interfaces/Login";
import { cadastros } from "../data/Mock";
import { CadastroInterface } from "../interfaces/Cadastro";

export class AuthService {
  private codigoVerificacao = "123456";

  login({ username, senha }: LoginInterface): boolean {
    const usuarioEncontrado = cadastros.find(
      (cadastro) => cadastro.username === username && cadastro.senha === senha
    );

    return usuarioEncontrado !== undefined;
  }

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
      codigo: cadastros.length + 1,
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