import { Knex, knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('offices', table => {
    table.increments('id').primary();

    table.integer('users_id')
      .notNullable()
      .references('id')
      .inTable('users');
    
    table.string('city').notNullable();
    table.integer('desk').notNullable();
    table.dateTime('date').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('offices');
}