import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button/index';

import logoImg from '../../assets/images/logoFCamara.svg';
import loginImg from '../../assets/images/login.svg';

import api from '../../services/api';

import './styles.css';

function Login() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    await api.post('/users', {
      name,
      email
    }).then((response) => {
      alert('Cadastro realizado com sucesso!');

      history.push('/offices', {
        userId: response.data.id,
        name
      });
    }).catch((error) => {
      console.log(error)
      alert('Erro no cadastro!');
    })
  }

  return (
    <div id="page-login">
      <div id="page-login-content" className="image-container">
        <img src={loginImg} alt="Imagem da página de login" />
      </div>

      <div className="content-container">
        <img src={logoImg} alt="Logo FCamara" />
        <h1>Gestão de Espaço</h1>

        <form id="login-form" onSubmit={handleCreateUser}>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite sua senha"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
          </div>

          <div className="input-block">
            <label htmlFor="user">Usuário</label>
            <input
              type="text"
              id="user"
              placeholder="name@fcamara.com.br"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <Link id="reset-password" to="#">
            Esqueci minha senha
          </Link>
          <Button type="submit" id="btn-enter">Entrar</Button>
        </form>

      </div>
    </div>
  );
}

export default Login;