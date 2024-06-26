import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const roles = [
    {
      value: 'teacher',
      label: 'Я - Преподаватель',
    },
    {
      value: 'student',
      label: 'Я - Ученик',
    },
    {
      value: 'parent',
      label: 'Я - Родитель',
    },
  ];

  const [selectedRole, setSelectedRole] = useState();
  const [errors, setErrors] = useState(null);
  const emailRef = useRef();
  const surnameRef = useRef();
  const nameRef = useRef();
  const patronymRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setIsAuthorized } = useStateContext();
  const navigate = useNavigate();

  const onSubmit = event => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      surname: surnameRef.current.value,
      name: nameRef.current.value,
      patronym: patronymRef.current.value,
      role: roleRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient.get('/sanctum/csrf-cookie').then(() => {
      axiosClient
        .post('/register', payload)
        .then(({ data }) => {
          // navigate('/home');
          setUser(data.user);
          setIsAuthorized(true);
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    });
  };

  const handleChange = e => {
    const { name } = e.target;
    if (name === 'role') {
      setSelectedRole(e.target.value);
    }

    setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="container d-flex flex-column">
      <form
        className="d-flex flex-column col-sm-12 mx-sm-0 col-md-6 mx-md-auto"
        onSubmit={onSubmit}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="text-center">Регистрация</h5>
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
              <label className="mb-1">Фамилия</label>
              <input
                type="text"
                name="surname"
                className={`form-control ${errors && errors.surname ? 'is-invalid' : ''}`}
                ref={surnameRef}
                onChange={handleChange}
              />
              {errors && errors.surname && (
                <div className="invalid-feedback">{errors.surname[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Имя</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors && errors.name ? 'is-invalid' : ''}`}
                ref={nameRef}
                onChange={handleChange}
              />
              {errors && errors.name && (
                <div className="invalid-feedback">{errors.name[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Отчество (необязательно)</label>
              <input
                type="text"
                name="patronym"
                className={`form-control ${errors && errors.patronym ? 'is-invalid' : ''}`}
                ref={patronymRef}
                onChange={handleChange}
              />
              {errors && errors.patronym && (
                <div className="invalid-feedback">{errors.patronym[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Роль</label>
              <select
                className={`form-select ${errors && errors.role ? 'is-invalid' : ''}`}
                name="role"
                ref={roleRef}
                onChange={handleChange}
              >
                <option selected value="">
                  Выберите роль
                </option>
                {roles.map((role, index) => (
                  <option key={index} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors && errors.role && (
                <div className="invalid-feedback">{errors.role[0]}</div>
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
              <small className="form-text text-muted">
                Пароль должен содержать 8 и более символов:
                <br />
                прописные латинские буквы, строчные латинские буквы и цифры.
              </small>
            </div>
            <div className="form-group mb-4 text-start">
              <label className="mb-1">Подтвердите пароль</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`}
                placeholder="Подветрдите ваш пароль"
                ref={passwordConfirmationRef}
                onChange={handleChange}
              />
              {errors && errors.password && (
                <div className="invalid-feedback">{errors.password[0]}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary d-flex ms-auto mb-3"
            >
              Регистрация
            </button>
            <div className="container-fluid p-0 d-flex flex-row justify-content-center">
              <p className="m-0">У вас уже есть аккаунт?&nbsp;</p>
              <p className="m-0">
                <a className="link-opacity-75-hover" href="/">
                  Войти
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
