# nodejs-prisma-restAPI-blog

<h1>EM DESENVOLVIMENTO</h1>

<h2>Sobre</h2>

<p>REST API de Blog com rotas para cadastro e login de usuários e criações e interações com posts feita com JavaScript utilizando o runtime NodeJS com o framework Express e TypeScript, protegendo rotas com JWT, autenticando dados de entrada com a biblioteca Joi, criando models, migrations e armazenando os dados no banco de dados PostgreSQL com o ORM Prisma.</p>
<p>Testes unitários e de integração feitos com framework de testes Jest e SuperTest.</p>
<p>Ambientes de produção e desenvolvimento criados em containers Docker utilizando Dockerfile para multi-stage building e Docker Compose para orquestração de containers.</p>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <br>
  <li>Docker</li>
  <br>
  <li>Docker Compose</li>
  <br>
</ul>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOAD DOS ARQUIVOS OU USE SSH:<br><code>git pull git@github.com:joaov1ct0r/nodejs-prisma-restAPI-blog.git</code></p>

<h3>VARIAVEIS DE AMBIENTE</h3>
<hr>

<p>ABRA O ARQUIVO .env E ALTERE AS VARIAVEIS DE AMBIENTE COM SEUS DADOS(USE .env.example COMO EXEMPLO)</p>

<ul>
  <li>SERVER_HOST = HOST DO SEU SERVER</li>
  <li>SERVER_PORT = PORTA QUE VOCÊ QUEIRA RODAR O SERVIDOR</li>
  <li>DB_HOST = ROTA PARA SEU BANCO DE DADOS</li>
  <li>DB_USER = SEU USUARIO DO BANCO DE DADOS</li>
  <li>DB_PASSWORD = SENHA DO SEU BANCO DE DADOS</li>
  <li>DB_DATABASE = NOME DO SEU BANCO DE DADOS</li>
  <li>DB_DATABASE_TEST = NOME DO SEU BANCO DE DADOS DE TESTE</li>
  <li>DB_PORT = PORTA DO SEU BANCO DE DADOS</li>
  <li>JWT_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
  <li>NODE_ENV = AMBIENTE DO SEU NODE</li>
</ul>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA ESCOLHA O MODO EM QUE QUER RODAR O PROJETO:
  <br>PRODUÇÃO: <br>DIGITE EM SEU TERMINAL: <code>sudo docker compose up --build -d</code>

<br>DESENVOLVIMENTO: <br>DIGITE EM SEU TERMINAL: <code>sudo docker compose up -f docker-compose.dev.yaml --build -d</code>

</p>

<p>APOS INICIAR O PROJETO EM SEU MODO PREFERIDO VA PARA A ROTA:<br><code>http://localhost:3000/api/docs</code>
PARA VER AS ROTAS DISPONIVEIS PARA FAZER AS REQUISIÇÕES</p>
