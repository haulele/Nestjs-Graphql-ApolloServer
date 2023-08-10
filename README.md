<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Setup DB (MongoDB Atlas)
```bash
$ Step 1: Create a new account here https://www.mongodb.com/cloud/atlas/register
$ Step 2: Login and Create new project, add member use want to have permission to access
$ Step 3: Build a database
  3.1 Choose teamplate M0 (or higher)
  3.2 Choose provider AWS (or another provider such as google cloud,..)
  3.3 Set name for database and type create
  3.4 Set username and password
  3.5 Choose My local evviroment
  3.6 Add 0.0.0.0 to allow any IP can connect to DB
  3.7 Finish and close
# Step 4: Choose connect -> driver and follow guilde to set up db on your repo, remember to get DB_URL like this
mongodb+srv://vfainternshiphauld:<password>@cluster0.55r5jny.mongodb.net/?retryWrites=true&w=majority
and replace MONGODB_URL in your .env file
```

# Installation

```bash
$ npm install
```
# Create file .env
```bash
$ Step 1: Create file .env
$ Step 2: Copy content inside .env.example and paste to .env (MONGODB URI follow SetupDB step)
```
# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
# Test API tool
## Altair GraphQL client
$ Download and install here <b>https://altairgraphql.dev/</b>
## GraphQL
$ Using this WebURL:  <b>http://localhost:4000/graphql</b>
## PostMan
$ Download PostMan and install here <b>https://www.postman.com/downloads/</b>
# Example query
## Signup new user (test with Altair GraphQl client for example)
$ Query 
```bash
mutation signup($file: Upload!) {
  signup(
    registerUserInput: {
      username: "hau0700000"
      password: "Fffssss"
      image: $file
    }
  ) {
    username
    isActive
    image
  }
}
```
$ Header
```bash
apollo-require-preflight : true <br></br>
```
$ File upload 
```bash
Choose file upload and upload
```
## Login
$ Query 
```bash
mutation login($input: LoginUserInput!) {
  login(loginUserInput: $input) {
    user {
      username
      isActive
      roles
    }
    access_token
  }
}
```
$ Variables
```bash
{
  "input":  {
    "username": "hau0700000",
    "password": "Fffssss"
  }
}
```
## Get Users 
$ Query 
```bash
query{
  users{
    username
    isActive
    id
    created_At
    deleted_At
    image
  }
}
```
$ Header
```bash
{
  "Authorization": "Bearer [access_token]"
}
```
## Get only one User
$ Query
```bash
query GetUser($username: String!, $imagesize: String!) {
  user(username: $username, imagesize: $imagesize) {
    id
    username
    roles
    image
    isActive
    created_At
    modified_At
    deleted_At
  }
}
```
$ Variables
```bash
{
  "username": "hau0700000",
  "imagesize": "M"
}
```
$ Header 
```bash
{
  "Authorization": "Bearer [access_token]"
}
```
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
