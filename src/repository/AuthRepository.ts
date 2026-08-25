import { bancoDados } from "../database/pool";

export async function buscarUsuario (){
    const { rows } = await bancoDados.query('select id_usuario from tb_usuario;');
    return rows;    
}

export async function buscarUsuarioPorCodigo (codigo:number){
    const { rows } = await bancoDados.query('select id_usuario from tb_usuario where id_usuario = $1;' [codigo]);
    return rows;
}