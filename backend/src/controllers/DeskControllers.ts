import { Request, Response } from 'express';

import connection from '../database/connection';

export default class DeskController {
  async index(request: Request, response: Response) {
    const filters = request.body;

    const office_id = filters.office_id;
    const date = filters.date;

    // Verificação de informações
    if (!office_id || !date) {
      return response.status(400).json({
        error: 'Missing filters to search workstation'
      })
    }

    if (typeof office_id !== 'number') {
      return response.send()
    }

    const trx = await connection.transaction();

    try{

      const office = await trx('offices').select('offices.restriction').where('id', '=', office_id);

      if(!office[0]) {
        await trx.rollback();
        
        return response.status(400).json({
          error: 'Office do not exists.'
        })
      }
      const workstations = await trx('desk').select('desk.workstation').where('date', '=', date).andWhere('office_id', '=', office_id);

      await trx.commit();
          
      return response.status(201).json(workstations); 

    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while reading the database.'
      })
    }
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
      const workstations = await trx('desk').select('desk.workstation').where('date', '=', date).andWhere('office_id', '=', office_id);
      
      console.log(workstations)

      // Verifica se o número de mesas agendadas está abaixo da restrição do escritório
      if (workstations.length > office[0].restriction) {
        await trx.rollback();
        
        return response.status(400).json({
          error: 'Maximum capacity reached. Please, choose another day.'
        })
      }

      if (workstations.find((desk) => desk.workstation === workstation)) {
        await trx.rollback();
        
        return response.status(400).json({
          error: 'Desk reserved. Please choose another one.'
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