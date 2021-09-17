import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";

import './styles.css';

import deskImg from '../../assets/images/calendar.svg';
import { IOffice, IUser } from '../Offices/Offices';

interface ISchedule extends IUser, IOffice {
  
}

function SelectDate() {
  const history = useHistory();
  const location = useLocation<ISchedule>();
  const { userId, name, officeId } = location.state;
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleSelectedDate(e: any) {
    e.preventDefault();

    history.push('/desk', {
      userId,
      name,
      officeId,
      selectedDate
    });
  }

  return(
    <div id="page-date">
      <PageHeader />

      <div id="page-date-content">
        <h1>Selecionar data</h1>

        <div id="page-date-container">
          <div className="image-content">
            <img src={deskImg} alt="Imagem da página de escolha de data" />
          </div>

          <div className="calendar-content">
            <Calendar
              className="calendar"
              onChange={setSelectedDate}
              value={selectedDate}
            />
            <Button type="button" id="btn-calendar" onClick={handleSelectedDate} >Selecionar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDate;