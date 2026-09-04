const knex = require('knex');
const path = require('path');

// Busca o knexfile.js subindo 2 níveis a partir de src/database/
const config = require(path.resolve(__dirname, '../../knexfile.js'));

const connection = knex(config.development || config);

module.exports = connection;