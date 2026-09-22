import { UsuarioRepository } from "../repository/UsuarioRepository";

const repository = new UsuarioRepository();

export class UsuarioService {
    async salvar(nome: string) {
        const existe = await repository.validarNomeUsuario(nome);

        if (existe) {
            return { mensagem: "Usuário já cadastrado!" };
        }
    }
}