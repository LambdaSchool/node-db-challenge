
exports.up = function(knex) {
  // represents the change we want to make to our schema
  return (
      knex.schema.createTable('projects', tbl => {
          tbl.increments();
          tbl.string('project_name', 128).notNullable();
          tbl.string('project_description', 128);
          tbl.boolean('project_completed').defaultTo(false)
      })
  )
};

exports.down = function(knex) {
   // represents undoing that change
  return(
      knex.schema.dropTableIfExists('projects')
  );
};
