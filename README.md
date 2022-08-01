# social-media-jwt-rest-api

<h1>EM DESENVOLVIMENTO</h1>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <br>
  <li>NPM</li>
  <br>
  <li>Express</li>
  <br>
  <li>PostgreSQL</li>
  <br>
  <li>bcrypt</li>
  <br>
  <li>dotenv</li>
  <br>
  <li>JWT</li>
  <br>
  <li>@hapi/joi</li>
  <br>
  <li>cookie-parser</li>
  <br>
  <li>cors</li>
  <br>
  <li>Sequelize</li>
  <br>
</ul>

<h2>Sobre</h2>

<p>Rest API de Social Media com cadastro e login do usuario, criação e interação com posts.</p>

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
  <li>DB_PORT = PORTA DO SEU BANCO DE DADOS</li>
  <li>DB_DIALECT = DIALETO DO SEU BANCO DE DADOS</li>
  <li>JWT_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
  <li>NODE_ENV = AMBIENTE DO SEU NODE</li>
</ul>

<h3>Sequelize</h3>
<hr>

<p>APOS INSERIR OS DADOS NO ARQUIVO .env DIGITE EM SEU TERMINAL: 
  <br><code>npx sequelize-cli db:create</code>
  <br><code>npx sequelize-cli db:migrate</code>
</p>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA ESCOLHA O MODO EM QUE QUER RODAR O PROJETO:
  <br>PRODUÇÃO: <code>npm run build</code>
  <code>npm run start</code>

<br>DESENVOLVIMENTO: <code>npm run dev</code>

</p>

<p>APOS INICIAR O PROJETO EM SEU MODO PREFERIDO VA PARA A ROTA:<br><code>http://localhost:3000/api/docs</code>
PARA VER AS ROTAS DISPONIVEIS PARA FAZER AS REQUISIÇÕES</p>
