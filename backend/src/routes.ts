import express from 'express';
import OfficesController from './controllers/OfficesController';
import DeskControllers from './controllers/DeskControllers';
import UserController from './controllers/UserController';

const routes = express.Router();
const officesController = new OfficesController();
const deskController = new DeskControllers();
const userController = new UserController();

// Faz o login;
routes.post('/users', userController.create);
// Seleciona o escritório;
routes.get('/offices', officesController.index);
// Selecionada a data e workstation;
routes.get('/desk', deskController.index);
routes.post('/desk', deskController.create);

export default routes;