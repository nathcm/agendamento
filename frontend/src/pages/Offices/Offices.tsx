import PageHeader from '../../components/PageHeader/index';

import officesImg from '../../assets/images/offices.svg';

import Button from '../../components/Button/index';

import './styles.css';

function Offices() {
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
            <Button type="submit" id="btn-santos">Santos</Button>
            <Button type="submit" id="btn-sp">São Paulo</Button>
            <div className="btn-submit-container">
              <Button type="submit" id="btn-submit">Avançar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offices;