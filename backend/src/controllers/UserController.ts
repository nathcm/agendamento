import { Request, Response } from 'express';

import connection from '../database/connection';

export default class UserController {
  async create(request: Request, response: Response) {
    const { 
      name,
      email,
     } = request.body;

     const trx = await connection.transaction();

     try{
      let createdUser = await trx('users').select('users.id', 'users.name').where('email', '=', email);

      if (createdUser[0]) {
        await trx('users').insert({
          name,
          email
        });
        
        await trx.commit();

        createdUser = await trx('users').select('users.id', 'users.name').where('email', '=', email);
        
        return response.status(201).json(createdUser);
      }
      
      // Insere as informações do usuário no bd;
      return response.status(200).json(createdUser);
     } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}