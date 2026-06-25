import { LoginInterface } from "../interfaces/Login";
import { cadastros, senhaSalva, user } from "../data/Mock";
import { CadastroInterface } from "../interfaces/Cadastro";
import { EsqueciSenhaInterface } from "../interfaces/EsqueciSenha";


export class AuthService {

    login({ username, senha }: LoginInterface) {
        if (user != username || senhaSalva != senha) {
            return "Credenciais inválidas!";
        }

        return "Login bem-sucedido!"
    };
    cadastro({ nome, username, senha, email, telefone }: CadastroInterface) {
        //Existe algum cadastro no mock com esta mesma informação?
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
            telefone
        };

        cadastros.push(novoCadastro);

        return "Cadastro realizado com sucesso!";
    }

    esqueciSenhaPassoI (email: string): EsqueciSenhaInterface [] {

        let encontreiEmail: true ;
        for (let i of cadastros) {
            if (i.email === email) {
            }
        }

        return [];
    }

}
