
# 🚀 Magic Stock

Aplicação para gerenciamento de estoque.
<p>Autor: Inácio Souza Rocha</p>
<a href="https://www.linkedin.com/in/inacio-souza/" target="_blank">
  <img src="https://img.shields.io/badge/-LinkedIn-0077B5?logo=linkedin&logoColor=white&style=flat-square"/>
</a>

---

## ️ Tecnologias Utilizadas

### Back-end
- **Node.js** v20.11.1
- **NestJS** v10.0.0
- **Prisma** v5.10.2

---

## ️ Como rodar a API


Certifique-se de ter instalado:

- Node.js
- NPM
- NVM *(caso utilize múltiplas versões do Node)*

Clone o projeto e siga os passos abaixo:

---

✔️ Se a sua versão do Node for diferente da especificada, execute na raiz do projeto:

```bash
nvm use
``` 

✔️ Acesse a pasta back e execute:  
```bash
npm install
``` 

✔️ Dentro da pasta back crie um arqivo '.env' contendo os itens:
- DATABASE_URL="..." ( URL do seu banco postgres )
- SECRETKEY= ... ( a secret que você queira usar para os tokens JWT, ex: secret )
- EXPIRESIN="..." ( o tempo de expiração do token, ex: 45m )
  
Suba o banco de dados postgres - Localmente eu estou utilizando o docker, é menos trabalhoso 

✔️ Na pasta back execute os comandos do prisma:
```bash
npx prisma migrate dev
npx prisma generate
```

✔️ Ainda na pasta back, execute o comando:
```bash
npm run start:dev
```

✔️ Nesse momento a aplicação já deve estar de pé, você pode testar os end-points no endereço: http://localhost:3000





