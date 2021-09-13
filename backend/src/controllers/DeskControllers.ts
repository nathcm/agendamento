import { Request, Response } from 'express';

import connection from '../database/connection';

interface WorkstationBooking {
  workstation: number;
  date: string;
}

export default class DeskController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const city = filters.city;
    const date = filters.date;
    const workstation = filters.workstation;

    // Verificação de informações
    if (!filters.city || !filters.date || !filters.workstation) {
      return response.status(400).json({
        error: 'Missing filters to search workstation'
      })
    }

    if (typeof city !== 'string') {
      return response.send()
    }

    // verifica restrição
    // const office = 

    // Verificar se a desk já foi ocupada;
    const desk = await connection('offices')
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
    
    return response.json(desk);
  }
  
  // Usuário selecionará a data;
  // Verificar se a capacidade total com restrição foi atingida,
  // Se foi atingida, solicitar escolha de outra data;
  // Se não foi atingida, mostrar as mesas disponíveis;

  // Usuário selecionou a mesa;
  // Restringir as mesas ao lado da selecionada;
  // Diminuir uma mesa na capacidade com restrições;

  // Após confirmar a reserva, mostrar a data e mesa selecionadas;
  
  async create(request: Request, response: Response) {
    const { 
      user_id,
      office_id,
      city,
      date,
      workstation
     } = request.body;

     // validação dos dados
     // garantir que os tipos recebidos sejam os requeridos

     const trx = await connection.transaction();
  
     try{
      // Seleciona o id do escritório selecionado pelo usuário
      const office = await trx('offices').select('offices.restriction').where('id', '=', office_id);

      if(!office[0]) {
        await trx.rollback();
        
        return response.status(400).json({
          error: 'Office do not exists.'
        })
      }

      // Seleciona a data escolhida pelo usuário
      const workstation = await trx('desk').select('desk.workstation').where('date', '=', date).andWhere('office_id', '=', office_id);
      
      console.log(workstation)

      // Verifica se o número de mesas agendadas está abaixo da restrição do escritório
      if (workstation.length > office[0].restriction) {
        await trx.rollback();
        
        return response.status(400).json({
          error: 'Maximum capacity reached. Please, choose another day.'
        })
      }

      const deskBooking = [{
        user_id,
        office_id,
        workstation,
        date
      }]

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