import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavbarWelcome from '../components/NavbarWelcome';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <NavbarWelcome />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        <div className="container d-flex flex-column">
          <h5 className="text-center">Авторизация</h5>
          <form className="d-flex flex-column col-sm-12 mx-sm-0 col-md-6 mx-md-auto">
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Email</label>
              <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Введите ваш адрес электронной почты"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Пароль</label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Введите ваш пароль"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email[0]}</div>
              )}
            </div>
            <div className="container-fluid p-0 d-flex flex-row align-items-center mb-3">
              <div className="form-check text-start me-auto">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                ></input>
                <label className="form-check-label">Запомнить меня</label>
              </div>
              <p className="m-0">
                <a className="link-opacity-75-hover" href="#">
                  Забыли пароль?
                </a>
              </p>
            </div>
            <button type="submit" className="btn btn-primary d-flex ms-auto">
              Войти
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
