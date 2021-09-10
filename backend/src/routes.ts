import express from 'express';
import knex from './database/connection';
import OfficesController from './controllers/OfficesController';

const routes = express.Router();
const officesController = new OfficesController();

routes.get('/offices', officesController.index);

// Usuário informa nome e e-mail;
routes.post('/users', async (request, response) => {
  const { 
    name,
    email
   } = request.body;

   // Insere as informações do usuário no bd;
   await knex('users').insert({
     name,
     email
   });

   return response.json({ success: true });
});

export default routes;