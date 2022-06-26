# jwt-restApi

<h1>EM DESENVOLVIMENTO</h1>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <p><code>sudo apt install nodejs</code></p>
  <br>
  <li>NPM</li>
  <p><code>sudo apt install npm</code></p>
  <br>
  <li>Express</li>
  <p><code>npm install express</code></p>
  <br>
  <li>Mongoose</li>
  <p><code>npm install mongoose</code></p>
  <br>
  <li>bcrypt</li>
  <p><code>npm install bcryptjs</code></p>
  <br>
  <li>dotenv</li>
  <p><code>npm install dotenv</code></p>
  <br>
  <li>JWT</li>
  <p><code>npm install jsonwebtoken</code></p>
  <br>
</ul>

<h2>Sobre</h2>

<p>Rest API de cadastro e login do usuario</p>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOADS DO REPOSITORIO OU USE:<br><code>git@github.com:joaov1ct0r/jwt-restApi.git</code></p>

<h3>DEPENDENCIAS</h3>
<hr>

<p>INSTALE TODAS AS DEPENDENCIAS NECESSARIAS COM O COMANDO<code>npm install</code></p>

<h3>VARIAVEIS DE AMBIENTE</h3>
<hr>

<p>ABRA O ARQUIVO .env E ALTERE AS VARIAVEIS DE AMBIENTE COM SEUS DADOS</p>

<ul>
  <li>NODE_ENV_SERVER_PORT = PORTA QUE VOCÊ QUEIRA RODAR O SERVIDOR</li>
  <li>NODE_ENV_DB_HOST = ROTA PARA SEU BANCO DE DADOS MONGODB</li>
  <li>NODE_ENV_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
</ul>

<h3>Mongoose</h3>
<hr>

<p>FAÇA A CONEXÃO COM SEU MONGODB INSERINDO O LINK EM <code>NODE_ENV_TOKEN_SECRET</code> NO ARQUIVO .ENV</p>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA INICIE O SERVIDOR WEB NO SEU TERMINAL COM O COMANDO:<br><code>npm start</code></p>

<p>APOS ISSO AS ROTAS:<br><code>localhost:3000/usuario/login</code>
<br><code>localhost:3000/usuario/register</code>
<br><code>localhost:3000/admin/</code> ESTARÃO DISPONIVEIS PARA FAZER AS REQUISIÇÕES</p>
