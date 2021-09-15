import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";

import deskImg from '../../assets/images/calendar.svg';

function SelectDate() {
  return(
    <div id="page-date">
      <PageHeader />

      <div id="page-content">
        <h1>Selecionar data</h1>

        <div id="page-date-container">
          <div id="image-content">
            <img src={deskImg} alt="Imagem da página de escolha de data" />
          </div>

          <div id="calendar-content">
            <Button type="submit" id="btn-submit">Selecionar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDate;