# auquimia-backend
backend do projeto empresa, desenvolvido no Curso Tecnico em Desenvolvimento de Sistemas, (SENAI + SKA).

## AUTORES 
Taís Enge e Gael Scheffer

## O QUE FAZ
Esse é um site de um petshop, com o intuito de ter diversas funcionalidades, como o cadastro de pets, o seu acompanhamento mensal, agendamento de banhos e tosas, uma loja de produtos, entre outras coisas. 

## ORGANIZAÇÃO DA PASTA

### COMO EXECUTAR

### FUNCAO PARA ENCONTRAR ALGO
```bash
export const senhaSalva = "password";
export const user = "username";

const repetir = [1, 2, 3, 4];
const front = 1;

let existe = false;
for (let i = 0; i < 4; i++) {
    if (repetir[i] === front) {
        existe = true
    }
}

const front2 = "alexandre@gmail.com";
const front3 = 1;

let encontreiSenha = "";
for (let i of usuario) {
    if (i.email === front2 && i.codigo == front3) {
        encontreiSenha = i.senha;
    }
}

respostaServidor(res, encontreiSenha, 200);
```