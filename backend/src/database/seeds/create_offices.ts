import { Knex, knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('offices').insert([
    { city: 'São Paulo', capacity: 600, restriction: 240 },
    { city: 'Santos', capacity: 100, restriction: 40 },
  ]);
}