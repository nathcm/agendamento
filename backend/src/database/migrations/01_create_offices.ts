import { Knex, knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('offices', table => {
    table.increments('id').primary();
    table.string('city').notNullable();
    table.integer('capacity').notNullable();
    table.integer('restriction').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('offices');
}