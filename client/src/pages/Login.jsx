import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);

  const { setUser, setIsAuthorized } = useStateContext();

  const onSubmit = async event => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    await axiosClient.get('/sanctum/csrf-cookie').then(async () => {
      await axiosClient
        .post('/login', payload, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then(({ data }) => {
          setUser(data.user);
          setIsAuthorized(true);
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors);
            } else {
              setErrors({
                email: [response.data.message],
              });
            }
          }
        });
    });
  };

  const handleChange = e => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="container d-flex flex-column">
      <h5 className="text-center">Авторизация</h5>
      <form
        className="d-flex flex-column col-sm-12 mx-sm-0 col-md-6 mx-md-auto"
        onSubmit={onSubmit}
      >
        <div className="form-group mb-3 text-start">
          <label className="mb-1">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors && errors.email ? 'is-invalid' : ''}`}
            placeholder="Введите ваш адрес электронной почты"
            ref={emailRef}
            onChange={handleChange}
          />
          {errors && errors.email && (
            <div className="invalid-feedback">{errors.email[0]}</div>
          )}
        </div>
        <div className="form-group mb-3 text-start">
          <label className="mb-1">Пароль</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`}
            placeholder="Введите ваш пароль"
            ref={passwordRef}
            onChange={handleChange}
          />
          {errors && errors.password && (
            <div className="invalid-feedback">{errors.password[0]}</div>
          )}
        </div>
        <div className="container-fluid p-0 d-flex flex-row align-items-center mb-3">
          <div className="form-check text-start me-auto">
            <input type="checkbox" className="form-check-input"></input>
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
  );
};

export default Login;
