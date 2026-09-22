import { IUsuario } from "../model/iUsuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<IUsuario> {

    async validarNomeUsuario(nome: string): Promise<boolean | null> {
        return await this.executarSqlUnico(
            "select exists (select 1 from tb_usuario where tx_nome = $1)",
            [nome]
        );
    }


    // depois 
    async buscarTodos(): Promise<IUsuario[]> {
        return [];
    }
    async buscarPorId(id: number): Promise<IUsuario | null> {
        return null;
    }

    async salvar(dados: Omit<IUsuario, "id">): Promise<IUsuario> {
        const a = await this.executarSqlUnico<IUsuario>(
            "Insert into tb_usuario",
            [],
        );
        if (!a) throw new Error("Nao existe");

        return a;
    }

    async atualizar(
        id: number,
        dados: Partial<Omit<IUsuario, "id">>,
    ): Promise<IUsuario | null> {
        return null;
    }


    async deletar(id: number): Promise<boolean> {
        const a = await this.executarSql<IUsuario>(
            "delete from tb_usuario",
            [],
        );

        return a.length > 0;
    }
}

