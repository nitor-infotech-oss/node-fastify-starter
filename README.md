# NodeJS Boilerplate

This is a boilerplate application for building REST APIs in Node.js using ES6 and Fastify. Intended for use with Postgres using Sequelize ORM.

## Installation

This application uses yarn, so let's install yarn first.

```bash
npm install -g yarn
```
Install dependencies:

```bash
yarn
```

## Usage
Set environment (vars):
```bash
cp .env-sample .env
```

Start server:
```bash
yarn start
```

Run tests:
```bash
# Run tests written in ES6
yarn test
```

## Set up database:

Run migrations
```bash
sequelize db:migrate
```
Run seeds
```bash
sequelize db:seed:all
```
Create new migration file
```bash
sequelize model:generate --name User --attributes name:string,email:string
```
Generate new seed file
```bash
sequelize seed:generate --name add-new-user
```

** Database details can be updated in the .env file

## License
[ISC](https://opensource.org/licenses/ISC)