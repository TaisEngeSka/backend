import { LoginInterface } from "../interfaces/Login";
import { senhaSalva, user } from "../data/Mock";


export class AuthService {

    async login({ username, senha }: LoginInterface) {
        if (user != username || senhaSalva != senha) {
            return "Credenciais inválidas!";
        }

        return "Login bem-sucedido!"
    };

}
