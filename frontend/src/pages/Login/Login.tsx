import './styles.css';

import Button from '../../components/Button/index';

import logoImg from '../../assets/images/logoFCamara.svg';
import loginImg from '../../assets/images/login.svg';

function Login() {
  return (
    <div id="page-login">
      <div id="page-login-content" className="image-container">
        <img src={loginImg} alt="Imagem da página de login" />
      </div>

      <div className="content-container">
        <img src={logoImg} alt="Logo FCamara" />
        <h1>Gestão de Espaço</h1>

        <form id="login-form">
          <div className="input-block">
            <label htmlFor="user">Usuário</label>
            <input type="text" id="user" placeholder="name@fcamara.com.br" />
          </div>
          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input type="text" id="password" placeholder="Digite sua senha" />
          </div>

          <a id="reset-password" href="#">
            Esqueci minha senha
          </a>
        </form>

        <Button type="submit" id="btn-enter">Entrar</Button>
      </div>
    </div>
  );
}

export default Login;