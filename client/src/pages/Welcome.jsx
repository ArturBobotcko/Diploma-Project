import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container d-flex flex-column gap-3 text-center text-md-start">
        <h1 className="display-6">
          Цифровая
          <br />
          образовательная платформа
          <br />
          «Название»
        </h1>
        <p className="lead">
          Откройте дверь в мир музыки с нашим электронным дневником.
          <br />
          Присоединяйтесь прямо сейчас!
        </p>
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate('/login');
            }}
          >
            Войти
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              navigate('/register');
            }}
          >
            Регистрация
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
