import express from 'express';
// import OfficesController from './controllers/OfficesController';
import DeskControllers from './controllers/DeskControllers';

const routes = express.Router();
// const officesController = new OfficesController();
const deskController = new DeskControllers();

// Faz o login;
// routes.get('/users', deskController.index);
// routes.post('/users', deskController.create);
// Seleciona o escritório;
// routes.get('/offices', officesController.index);
// Selecionada a data;
// routes.get('/date', deskController.index);
// routes.post('/date', deskController.create);
// Seleciona a mesa;
routes.get('/desk', deskController.index);
routes.post('/desk', deskController.create);

export default routes;