const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
};

function get() {
    return db('project');
}

function getById(id) {
    return db.select('*').from('project').where('project.id', id).first();
}

function add(proj) {
    return db('project').insert(proj).into('project');
}

function update(id, changes) {
    return db('project').where({ id }).update(changes);
}

function remove(id) {
    return db('project').where({ id }).del();
}