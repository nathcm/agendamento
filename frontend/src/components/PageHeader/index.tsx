import logoImg from '../../assets/images/logoFCamara.svg';

import './styles.css';

const PageHeader = () => {
  return (
    <header id="page-header">
      <div id="top-bar-container">
        <img src={logoImg} alt="logo FCamara" />

        <nav id="nav-bar">
          <ul>
            <li><a href="#" className="nav-link">Escritórios</a></li>
            <li><a href="#" className="nav-link">Calendário</a></li>
            <li><a href="#" className="nav-link">Reserva de Mesas</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default PageHeader;