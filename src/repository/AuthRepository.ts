import { bancoDados } from "../database/pool";
import { CadastroInterface } from "../interfaces/Cadastro";
import { LoginInterface } from "../interfaces/Login";
import { RetornoLoginInterface } from "../interfaces/RetornoLogin";

// função para fazer o login do usuário, verificando se o username e senha existem no banco de dados
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

// cadastro de um novo user no banco de dados, verificando se o username, email e telefone já existem
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

// função de verificar se o usuário existe no banco de dados, retornando true ou false
export async function vericarSeJaExiste(
    username: string, 
    email: string, 
    telefone: number):Promise<boolean> {

    const { rows } = await bancoDados.query(`
            SELECT exists(
                 select 1 
                 FROM tb_usuario
                 WHERE 
                    tx_username = $1
                    OR tx_email = $2 
                    OR nr_telefone = $3
                );`,
        [username, email, telefone]);
    return rows.length > 0;
}
