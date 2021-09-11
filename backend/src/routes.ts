import express from 'express';
import knex from './database/connection';
import OfficesController from './controllers/OfficesController';
import DeskControllers from './controllers/DeskControllers';

const routes = express.Router();
const officesController = new OfficesController();
const deskController = new DeskControllers();

// Usuário informa nome e e-mail;
routes.post('/users', deskController.create);
// Busca no DB para mostrar o escritório que o usuário selecionará;
routes.get('/offices', officesController.index);

export default routes;