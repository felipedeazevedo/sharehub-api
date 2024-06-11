## ShareHub API

Esse repositório contém o back-end para o ShareHub, marketplace de equipamentos médicos criado pelos
alunos das disciplinas de Arquitetura de Software e Programação Web, da Universidade Católica de Brasília.

As funcionalidades implementadas neste mpv, são:
- Criar, editar, litar e deletar publicações de equipamentos
- Cadastro e login
- Recuperação de senha
- Criar, editar, listar e deletar listas de material para as disciplinas

## Rodando o projeto

- Para o banco de dados, faça o download do docker em sua máquina para poder rodar uma instância do mysql.
- Feito use, rode o seguinte comando:

```bash
$ docker-compose up
```

Lembre que as informações de conexão definidas no docker-compose.yml pracisam estar no arquivo
.env

## Rodando o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```










