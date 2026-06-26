import { Request, Response } from "express";
import { LoginInterface } from "../interfaces/Login";
import { AuthService } from "../services/AuthService";
import { CadastroInterface } from "../interfaces/Cadastro";
import { respostaServidor } from "../util/RespostaServidor";
import { EsqueciSenhaInterface } from "../interfaces/EsqueciSenha";

export class AuthController {
  constructor(private authService = new AuthService()) {}

  async login(req: Request, res: Response) {
    const { username, senha }: LoginInterface = req.body;

    if (!username || !senha) {
      return respostaServidor(res, "Credenciais inválidas!", 401);
    }

    const loginValido = this.authService.login({ username, senha });

    if (!loginValido) {
      return respostaServidor(res, "Credenciais inválidas!", 401);
    }

    return respostaServidor(res, "Login bem-sucedido!", 200);
  }

  async efetuarCadastro(req: Request, res: Response) {
    const { nome, email, senha, username, telefone }: CadastroInterface =
      req.body;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      return respostaServidor(res, "E-mail inválido!", 400);
    }

    const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!senhaValida.test(senha)) {
      return respostaServidor(
        res,
        "A senha deve ter no mínimo 8 caracteres, uma letra e um número.",
        400
      );
    }

    const usernameValido = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameValido.test(username)) {
      return respostaServidor(
        res,
        "O username deve ter entre 3 e 20 caracteres e conter apenas letras, números ou underline.",
        400
      );
    }

    const telefoneString = String(telefone);
    const telefoneValido = /^(\d{10}|\d{11})$/;

    if (!telefoneValido.test(telefoneString)) {
      return respostaServidor(
        res,
        "Telefone inválido! Informe apenas números, com DDD. Exemplo: 11912345678.",
        400
      );
    }

    const respostaDoService = this.authService.efetuarCadastro({
      nome,
      email,
      senha,
      username,
      telefone,
    });

    if (respostaDoService !== "Cadastro realizado com sucesso!") {
      return respostaServidor(res, respostaDoService, 400);
    }

    return respostaServidor(res, respostaDoService, 200);
  }

  async esqueciSenhaPassoI(req: Request, res: Response) {
    const { email }: EsqueciSenhaInterface = req.body;

    if (!email) {
      return respostaServidor(res, "E-mail obrigatório!", 400);
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      return respostaServidor(res, "E-mail inválido!", 400);
    }

    const emailExiste = this.authService.esqueciSenhaPassoI(email);

    if (!emailExiste) {
      return respostaServidor(res, "E-mail não encontrado!", 404);
    }

    return respostaServidor(res, "E-mail válido!", 200);
  }

  async esqueciSenhaPassoII(req: Request, res: Response) {
    const { email, codigoVer }: EsqueciSenhaInterface = req.body;

    if (!email || !codigoVer) {
      return respostaServidor(res, "E-mail e código são obrigatórios!", 400);
    }

    const codigoValido = this.authService.esqueciSenhaPassoII(
      email,
      String(codigoVer)
    );

    if (!codigoValido) {
      return respostaServidor(res, "Código inválido!", 401);
    }

    return respostaServidor(res, "Código válido!", 200);
  }

  async esqueciSenhaPassoIII(req: Request, res: Response) {
    const { email, codigoVer, senha }: EsqueciSenhaInterface = req.body;

    if (!email || !codigoVer || !senha) {
      return respostaServidor(res, "Dados obrigatórios não enviados!", 400);
    }

    const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!senhaValida.test(senha)) {
      return respostaServidor(
        res,
        "A senha deve ter no mínimo 8 caracteres, uma letra e um número.",
        400
      );
    }

    const senhaAlterada = this.authService.esqueciSenhaPassoIII(
      email,
      String(codigoVer),
      senha
    );

    if (!senhaAlterada) {
      return respostaServidor(res, "Não foi possível alterar a senha!", 400);
    }

    return respostaServidor(res, "Senha alterada com sucesso!", 200);
  }
}