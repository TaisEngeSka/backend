export interface CadastroInterface {
    //variavies passadas pelo cadastro pra cá
    codigo?: number; // código do usuário, gerado automaticamente
    nome: string; // nome completo do usuário
    username: string; // nome que aparece no perfil do usuário
    senha: string;
    email: string;
    telefone: number;
}
