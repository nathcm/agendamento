import { Request, Response } from 'express';
import { Knex } from 'knex';

import connection from '../database/connection';

interface WorkstationBooking {
  workstation: number;
  date: string;
}

export default class DeskController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const city = filters.city as string;
    const workstation = filters.workstation as string;
    const date = filters.date as string;

    // Verificação de informações
    if (!filters.city || !filters.workstation || !filters.date) {
      return response.status(400).json({
        error: 'Missing filters to search workstation'
      })
    }

    const deskVerified = await connection('offices')
    .whereExists(function() {
      this.select('desk.*')
      .from('desk')
      .whereRaw('`desk`.`office_id` = `offices`.`id`')
      .whereRaw('`desk`.`workstation` = ??', [Number(workstation)])
      .whereRaw('`desk`.`date` = ??', [String(date)])
    })
    .where('offices.city', '=', city)
    .join('users', 'desk.user_id', '=', 'users.id')
    .select(['desk.*', 'users.*']);
    // Usuário selecionará a data;
    // Verificar se a capacidade total com restrição foi atingida,
    // Se foi atingida, solicitar escolha de outra data;
    // Se não foi atingida, mostrar as mesas disponíveis;

    // Usuário selecionou a mesa;
    // Restringir as mesas ao lado da selecionada;
    // Diminuir uma mesa na capacidade com restrições;

    // Após confirmar a reserva, mostrar a data e mesa selecionadas;
    
  }

  async create(request: Request, response: Response) {
    const { 
      email,
      senha,
      workstation
     } = request.body;

     const trx = await connection.transaction();
  
     try{
       // Insere as informações do usuário no bd;
       const insertedUsersIds = await trx('users').insert({
         email,
         senha
      });

      // Pega o id do usuário para guardar na tabela 'desk';
      const user_id = insertedUsersIds[0];

      // Seleciona o id do escritório;
      const insertedOfficesIds = await trx('offices').select('offices.id');

      // Pega o id do escritório para guardar na tabela 'desk';
      const office_id = insertedOfficesIds[0];


      const deskBooking = workstation.map((workstationBooking: WorkstationBooking) => {
        return {
          user_id,
          office_id,
          workstation: workstationBooking.workstation,
          date: workstationBooking.date,
        };
      });

      // Insere os dados na tabela 'desk';
      await trx('desk').insert(deskBooking);

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