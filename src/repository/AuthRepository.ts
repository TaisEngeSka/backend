import { bancoDados } from "../database/pool";
import { CadastroInterface } from "../interfaces/Cadastro";
import { LoginInterface } from "../interfaces/Login";
import { RetornoLoginInterface } from "../interfaces/RetornoLogin";

export async function buscarUsuario() {
    const { rows } = await bancoDados.query('select id_usuario from tb_usuario;');
    return rows;
}

export async function buscarUsuarioNoBD(
    username: string,
    senha: string
): Promise<RetornoLoginInterface | null> {
    const { rows } = await bancoDados.query(
        "SELECT id_usuario FROM tb_usuario WHERE tx_username = $1 AND tx_senha = $2;",
        [username, senha]
    );

    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }

}

export async function cadastroUserNoBancoDados(
    nome: string,
    username: string,
    senha: string,
    email: string,
    telefone: number
): Promise<CadastroInterface | null> {
    const { rows } = await bancoDados.query(
        "insert into tb_usuario (tx_nome, tx_username, tx_senha, tx_email, nr_telefone) values($1, $2, $3, $4, $5)",
        [nome, username, senha, email, telefone]
    );

    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    } 
}

