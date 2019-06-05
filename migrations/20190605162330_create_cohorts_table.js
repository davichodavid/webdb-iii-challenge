//new changes to databse schema
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(table) {
    //primary key called id, auto increments, is interger
    table.increments();
    table
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

//how to undo the changes to the schema
exports.down = function(knex, Promise) {};

//npx knex migrate:make create_cohorts_table
