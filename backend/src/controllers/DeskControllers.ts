import { Request, Response } from 'express';

import connection from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface DeskBooking {
  workstation: number;
  date: string;
  from: string;
  to: string;
}

export default class DeskController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const city = filters.city as string;
    const workstation = filters.workstation as string;
    const date = filters.date as string;
    const time = filters.date as string;

    // Verificação de informações
    if (!filters.city || !filters.workstation || !filters.date || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search workstation'
      })
    }

    const timeInMinutes = convertHourToMinutes(time);

    // Usuário selecionará a data;
    // Verificar se a capacidade total com restrição foi atingida,
    // Se foi atingida, solicitar escolha de outra data;

    // Se não foi atingida, mostrar as mesas disponíveis;
    // Mostrar os horários disponíveis;

    // Usuário selecionou a mesa;
    // Restringir as mesas ao lado da selecionada;
    // Diminuir uma mesa na capacidade com restrições;
    
  }
}