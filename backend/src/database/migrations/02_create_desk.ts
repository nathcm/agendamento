import { Knex, knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('desk', table => {
    table.increments('id').primary();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users');
    table.integer('office_id')
      .notNullable()
      .references('id')
      .inTable('offices');
    table.integer('workstation').notNullable();
    table.date('date').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('desk');
}