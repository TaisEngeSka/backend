import { LoginInterface } from "../interfaces/Login";
import { cadastros } from "../data/Mock";
import { CadastroInterface } from "../interfaces/Cadastro";
import { gerarToken } from "../jwt/jwt";
import { buscarUsuarioNoBD, cadastroUserNoBancoDados, vericarSeJaExiste } from "../repository/AuthRepository";
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

  async efetuarCadastro({
    nome,
    username,
    senha,
    email,
    telefone,
  }: CadastroInterface): Promise<string> {

    const  usuarioJaExiste =  await vericarSeJaExiste(username, email, telefone);
    if(usuarioJaExiste) {
      return "Usuário já cadastrado!";
    }

    await cadastroUserNoBancoDados(nome, username, senha, email, telefone);
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
