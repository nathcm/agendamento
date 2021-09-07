import { Knex, knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('desk_santos', table => {
    table.increments('id').primary();

    table.integer('users_id')
      .notNullable()
      .references('id')
      .inTable('users');
    
    table.integer('desk').notNullable();
    table.dateTime('date').notNullable();
    table.time('schedule').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('desk_santos');
}