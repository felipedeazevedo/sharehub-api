## ShareHub API

Esse repositório contém o back-end para o ShareHub, marketplace de equipamentos médicos criado pelos
alunos das disciplinas de Arquitetura de Software e Programação Web, da Universidade Católica de Brasília.

Os endpoints da API permitem:
- Criar, editar, litar e deletar publicações de equipamentos
- Cadastro e login
- Recuperação de senha
- Criar, editar, listar e deletar listas de material para as disciplinas

## Banco de dados local

- Para rodar o banco de dados, faça o download do Docker em sua máquina para poder rodar uma instância do MySQL.
- Feito isso, rode o seguinte comando estando na raiz do projeto:

```bash
$ docker-compose up
```

Lembre que as informações de conexão definidas no docker-compose.yml pracisam estar definidas também no arquivo
.env (Existe um exemplo no arquivo env.example, mas em caso de dúvides peça ajuda ao dono do repo)

## Rodando o projeto

Instale as dependências necessárias:
```bash
$ npm install
```

Rodando o projeto:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Swagger (OpenAPI)
Esta API REST tem todos os seus endpoints documentados, passa acessar a documentação localmente use o seguinte endereço (Pode mudar de acordo
com a porta da sua aplicação local):
http://localhost:3000/api#/










