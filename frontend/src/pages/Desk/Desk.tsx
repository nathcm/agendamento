import {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";

import api from '../../services/api';

import './styles.css';

interface IScheduleWorkstation {
  userId: number,
  officeId: number,
  selectedDate: Date,
  name: string
}

function Desk() {
  const history = useHistory();
  const location = useLocation<IScheduleWorkstation>();
  const { userId,
    officeId,
    selectedDate,
  } = location.state;
  
  const [workstationNumber, setWorkstationNumber] = useState(0);
  const [workstationList, setWorkstationList] = useState([]);
  
  useEffect(() => {handleWorkstation()});

  async function handleScheduleWorkstation() {
    const data = {
      user_id: userId,
      office_id: officeId,
      date: selectedDate,
      workstation: workstationNumber
    }

    await api.post('/desk', data).then((response) =>{
      alert('Cadastro realizado com sucesso!');

      history.push('/done', {workstationNumber});
    }).catch(() => {
      alert('Erro no cadastro!');
    })
  }

  async function handleWorkstation() {
    await api.get('/desk', {
      params: {
        office_id: officeId,
        date: selectedDate
      }
    }).then((response) => {
      alert('Cadastro realizado com sucesso!');
      setWorkstationList(response.data);
      return
    }).catch(() => {
      alert('Erro no cadastro!');
    })
  }

  return(
    <div id="page-desk">
      <PageHeader />

      <div id="page-desk-content">
        <h1>Sala</h1>

        <div id="page-desk-container">
          <div className="grid desk-content">

          {
            workstationList.map((workstation: any) => {
              return (
                workstation % 2 == 0
                ?
                <section className="grid desk-grid-content">
                  <div className="workstation disabled">
                    <button onClick={()=>{setWorkstationNumber(workstation)}}>{workstation}</button>
                  </div>
                </section>
                :
                <section className="grid desk-grid-content">
                  <div className="workstation">
                    <button onClick={()=>{setWorkstationNumber(workstation)}}>{workstation}</button>
                  </div>
                </section>
              )
            })
          }
            {/* <section className="grid desk-grid-content">
              <div className="workstation">1</div>
              <div className="workstation">2</div>
              <div className="workstation">3</div>
              <div className="workstation">4</div>
              <div className="workstation">5</div>
              <div className="workstation">6</div>
              <div className="workstation">7</div>
              <div className="workstation">8</div>
              <div className="workstation">9</div>
              <div className="workstation">10</div>
            </section>

            <section className="grid desk-grid-content">
              <div className="workstation">11</div>
              <div className="workstation">12</div>
              <div className="workstation">13</div>
              <div className="workstation">14</div>
              <div className="workstation">15</div>
              <div className="workstation">16</div>
              <div className="workstation">17</div>
              <div className="workstation">18</div>
              <div className="workstation">19</div>
              <div className="workstation">20</div>
            </section>

            <section className="grid desk-grid-content">
              <div className="workstation">21</div>
              <div className="workstation">22</div>
              <div className="workstation">23</div>
              <div className="workstation">24</div>
              <div className="workstation">25</div>
              <div className="workstation">26</div>
              <div className="workstation">27</div>
              <div className="workstation">28</div>
              <div className="workstation">29</div>
              <div className="workstation">30</div>
            </section> */}

            <section className="grid">
              <div className="btn-workstation">
                <Button type="button" id="btn-submit" onClick={handleScheduleWorkstation} >Selecionar</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desk;