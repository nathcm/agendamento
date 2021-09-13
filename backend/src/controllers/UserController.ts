import { Request, Response } from 'express';

import connection from '../database/connection';

export default class UserController {
  async create(request: Request, response: Response) {
    const { 
      email,
      senha,
     } = request.body;

     const trx = await connection.transaction();

     try{
      const createdUser = await trx('users').select('users.id').where('email', '=', email);

      if (createdUser[0]) {
        await trx.rollback();
        
        return response.status(400).json({
          error: 'User already exists.'
        })
      }
      // Insere as informações do usuário no bd;
      await trx('users').insert({
        email,
        senha
      });

      await trx.commit();
          
      return response.status(201).send(); 
     } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}