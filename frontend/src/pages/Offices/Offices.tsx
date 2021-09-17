import {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/index';
import Button from '../../components/Button/index';

import officesImg from '../../assets/images/offices.svg';

import api from '../../services/api';

import './styles.css';

export interface IUser {
  userId: number,
  name: string,
}

export interface IOffice {
  officeId: number,
}

function Offices() {
  const history = useHistory();
  const [officeId, setOfficeId] = useState(0);
  const [officeList, setOfficeList] = useState<IOffice[]>([]);
  
  useEffect(() => {handleOffices()});
  const location = useLocation<IUser>();
  const { userId, name } = location.state;
  async function handleOffices() {
    await api.get('/offices')
      .then((response) => {
      alert('Escritório escolhido com sucesso!');
  
      console.log(response.data);
      setOfficeList(response.data);
    }).catch(() => {
      alert('Erro na leitura do escritório!');
    })
  } 

  function handleSelectedOffice() {
    history.push('/date', {
      userId,
      name,
      officeId
    });
  }

  return (
    <div id="page-offices">
      <PageHeader />
      
      <div id="page-content">
        <h1>Escolha um escritório</h1>

        <div id="page-offices-container">
          <div id="image-content" className="offices-container">
            <img src={officesImg} alt="Imagem da página de escolha do escritório" />
          </div>

          <div className="buttons">
            <Button type="button" id="btn-santos" onClick={() => setOfficeId(2)}>Santos</Button>
            <Button type="button" id="btn-sp" onClick={() => setOfficeId(1)}>São Paulo</Button>
            <div className="btn-submit-container">
              <Button type="submit" id="btn-offices" onClick={handleSelectedOffice}>Avançar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offices;