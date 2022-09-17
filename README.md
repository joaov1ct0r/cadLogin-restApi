# social-media-jwt-rest-api

<h1>EM DESENVOLVIMENTO</h1>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <br>
  <li>NPM</li>
  <br>
</ul>

<h2>Sobre</h2>

<p>REST API de Social Media com cadastro e login de usuários e criações e interações com posts feita com JavaScript utilizando o runtime NodeJS com o framework Express com TypeScript, protegendo rotas utilizando JWT (Json Web Token), autenticando os dados de entrada com @hapi/joi e criando models, migrations e armazenando os dados no banco de dados PostgreSQL utilizando Sequelize. testes unitarios e de integração feitos com Jest e SuperTest, ambientes criados em containers Docker utilizando Docker Compose.</p>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOAD DOS ARQUIVOS OU USE SSH:<br><code>git pull git@github.com:joaov1ct0r/social-media-jwt-rest-api.git</code></p>

<h3>DEPENDENCIAS</h3>
<hr>

<p>INSTALE TODAS AS DEPENDENCIAS NECESSARIAS COM O COMANDO<code>npm install</code></p>

<h3>VARIAVEIS DE AMBIENTE</h3>
<hr>

<p>ABRA O ARQUIVO .env E ALTERE AS VARIAVEIS DE AMBIENTE COM SEUS DADOS</p>

<ul>
  <li>SERVER_PORT = PORTA QUE VOCÊ QUEIRA RODAR O SERVIDOR</li>
  <li>DB_HOST = ROTA PARA SEU BANCO DE DADOS</li>
  <li>DB_USER = SEU USUARIO DO BANCO DE DADOS</li>
  <li>DB_PASSWORD = SENHA DO SEU BANCO DE DADOS</li>
  <li>DB_DATABASE = NOME DO SEU BANCO DE DADOS</li>
  <li>DB_DATABASE_TEST = NOME DO SEU BANCO DE DADOS DE TESTE</li>
  <li>DB_PORT = PORTA DO SEU BANCO DE DADOS</li>
  <li>DB_DIALECT = DIALETO DO SEU BANCO DE DADOS</li>
  <li>JWT_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
  <li>NODE_ENV = AMBIENTE DO SEU NODE</li>
</ul>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA ESCOLHA O MODO EM QUE QUER RODAR O PROJETO:
  <br>PRODUÇÃO: 1º<code>sudo docker compose up -f docker-compose.yml --build -d</code>

<br>DESENVOLVIMENTO: <code>sudo docker compose up -f docker-compose.dev.yml --build -d</code>

</p>

<p>APOS INICIAR O PROJETO EM SEU MODO PREFERIDO VA PARA A ROTA:<br><code>http://localhost:3000/api/docs</code>
PARA VER AS ROTAS DISPONIVEIS PARA FAZER AS REQUISIÇÕES</p>
