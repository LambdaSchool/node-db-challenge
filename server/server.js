const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.json({ api: 'running' });
});



module.exports = server;