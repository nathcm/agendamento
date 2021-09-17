import { Request, Response } from'express';
import knex from '../database/connection';

// Lista a cidade, capacidade e restrição do escritório;
class OfficesController {
  async index(request: Request, response: Response) {
    const offices = await knex('offices').select('*');
    console.log('api aqui');
  
    const serializedOffices = offices.map(office => {
      return {
        id: office.id,
        city: office.city,
        capacity: office.capacity,
        restriction: office.restriction
      }
    });
  
    return response.json(serializedOffices);
  }
}

export default OfficesController;