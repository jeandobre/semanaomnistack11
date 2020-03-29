const knex = require("knex");
const configuracao = require('../../knexfile');

const config = process.env.NODE_ENV === "test" ? configuracao.test : configuracao.development;

const conexao = knex(config);

module.exports = conexao;