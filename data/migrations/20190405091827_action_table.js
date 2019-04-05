
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().unique();
        tbl.string('notes').notNullable();
        tbl.boolean('completed').defaultTo(false);
        tbl.integer('id')
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions')
};
