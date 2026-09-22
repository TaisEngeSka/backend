import { IUsuario } from "../model/iUsuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<IUsuario> {

    async validarNomeUsuario(nome: string): Promise<boolean | null> {
        return await this.executarSqlUnico(
            "select 1 from tb_usuario where upper(tx_nome) = upper($1);",
            [nome]
        );
    }

    async buscarTodos(): Promise<IUsuario[]> {
        // Busca todos os usuários
        return await this.executarSql<IUsuario>(
            "SELECT * FROM tb_usuario;",
            []
        );
    }

    async buscarPorId(id: number): Promise<IUsuario | null> {
        // Busca um usuário específico pelo ID
        return await this.executarSqlUnico<IUsuario>(
            "SELECT * FROM tb_usuario WHERE id_usuario = $1;",
            [id]
        );
    }

    async salvar(dados: Omit<IUsuario, "id">): Promise<IUsuario> {
        // Insere o usuário e retorna o registro criado
        const a = await this.executarSqlUnico<IUsuario>(
            "Insert into tb_usuario (tx_email, tx_senha, tx_nome) values ('$1', '$2', '$3') returning * ;",
            [dados.tx_email, dados.tx_senha, dados.tx_nome]
        );
        if (!a) throw new Error("Nao existe");
        return a;
    }

    async atualizar(
        id: number,
        dados: Partial<Omit<IUsuario, "id">>,
    ): Promise<IUsuario | null> {
        // Atualiza o nome do usuário
        const a = await this.executarSqlUnico<IUsuario>(
            " UPDATE tb_usuario SET tx_nome = '$2' WHERE id_usuario = $1;",
            [id, dados.tx_nome]
        );
        return a;
    }


    async deletar(id: number): Promise<boolean> {
        // Remove o usuário
        const a = await this.executarSql<IUsuario>(
            "delete from tb_usuario where id_usuario = $1",
            [id]
        );
        return a.length > 0;
    }
}

