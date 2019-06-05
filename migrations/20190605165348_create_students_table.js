//new changes to database schema
exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(table) {
    table.increments("id");
    table
      .string("name", 128)
      .notNullable()
      .unique();
    table.foreign("cohort_id").references("cohorts.id");
  });
};

//how to undo changes to schema
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};

//npx knex migrate:make create_students_table
