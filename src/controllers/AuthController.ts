import { Request, Response } from "express";
import { LoginInterface } from "../interfaces/Login";
import { AuthService } from "../services/AuthService";
import { CadastroInterface } from "../interfaces/Cadastro";
import { respostaServidor } from "../util/RespostaServidor";
import { EsqueciSenhaInterface } from "../interfaces/EsqueciSenha";

export class AuthController {

    constructor(private authService = new AuthService()) { }

    async login(req: Request, res: Response) {
        const { username, senha }: LoginInterface = req.body;

        if (username == null || username == "") {
            return respostaServidor(res, "Credenciais inválidas!", 401);
        }
        if (senha == null || senha == "") {
            return respostaServidor(res, "Credenciais inválidas!", 401);
        }

        const respostaDoService = this.authService.login({ username, senha });

        return respostaServidor(res, respostaDoService, 200);
    };

    async cadastro(req: Request, res: Response) {
        const { email, senha, username, telefone }: CadastroInterface = req.body;

        // Validar e-mail
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            return respostaServidor(res, "E-mail inválido!", 400);
        }

        // Validar senha
        const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

        if (!senhaValida.test(senha)) {
            return respostaServidor(
                res,
                "A senha deve ter no mínimo 8 caracteres, uma letra e um número.",
                400
            );
        }

        // Validar username
        const usernameValido = /^[a-zA-Z0-9_]{3,20}$/;

        if (!usernameValido.test(username)) {
            return respostaServidor(
                res,
                "O username deve ter entre 3 e 20 caracteres e conter apenas letras, números ou underline.",
                400
            );
        }

        // Validar telefone como number
        const telefoneString = String(telefone);

        const telefoneValido = /^(\d{10}|\d{11})$/;

        if (!telefoneValido.test(telefoneString)) {
            return respostaServidor(
                res,
                "Telefone inválido! Informe apenas números, com DDD. Exemplo: 11912345678.",
                400
            );
        }

        return respostaServidor(res, "Cadastro realizado com sucesso!", 200);
    };

    async esqueciSenhaPassoI(req: Request, res: Response) {
        const { email}: EsqueciSenhaInterface = req.body;
        if (email == null || email == "") {
            return respostaServidor(res, "Credenciais inválidas!", 401);
        } else {
            // Validar e-mail
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            return respostaServidor(res, "E-mail inválido!", 400);
        }
        }
    }

}
