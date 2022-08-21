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
      // let createdUser = await trx('users').select('users.id', 'users.name').where('email', '=', email);
      const user = await trx('users').select('users.id', 'users.name').where('email', '=', email).first();
      console.log('user',user);

      if(user) throw new Error('Usuário existente');

      await trx('users').insert({
        name,
        email
      });

      await trx.commit();
      const createdUser = await trx('users').select('users.id', 'users.name').where('email', '=', email);
      
      return response.status(201).json(createdUser);
     } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}