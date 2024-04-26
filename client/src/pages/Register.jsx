import { useState } from 'react';
import NavbarWelcome from '../components/NavbarWelcome';
import Footer from '../components/Footer';
import axios from 'axios';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronym, setPatronym] = useState('');
  const [role, setRole] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    surname: '',
    name: '',
    patronym: '',
    role: '',
    student_class: '',
    school: '',
    password: '',
  });

  const roles = [
    {
      value: 'teacher',
      label: 'Я - Преподаватель',
    },
    {
      value: 'student',
      label: 'Я - Ученик',
    },
  ];

  const handleRoleChange = event => {
    setSelectedRole(event.target.value);
    setRole(event.target.value); // Обновляем также значение поля роли
  };

  const clearFields = () => {
    setEmail('');
    setSurname('');
    setName('');
    setPatronym('');
    setRole('');
    setStudentClass('');
    setSchool('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const API_URL = 'http://localhost:8000/api/register';
    await axios
      .post(API_URL, {
        email: email,
        surname: surname,
        name: name,
        patronym: patronym,
        role: role,
        student_class: studentClass,
        school: school,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then(response => {
        console.log(response.data);
        clearFields;
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      });
  };

  const clearErrors = fieldName => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    setErrors(newErrors);
  };

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <NavbarWelcome />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        <div className="container d-flex flex-column">
          <h5 className="text-center">Регистрация</h5>
          <form
            className="d-flex flex-column col-sm-12 mx-sm-0 col-md-6 mx-md-auto"
            onSubmit={handleSubmit}
          >
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Введите ваш адрес электронной почты"
                onClick={() => clearErrors('email')}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Фамилия</label>
              <input
                type="text"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                onClick={() => clearErrors('surname')}
              />
              {errors.surname && (
                <div className="invalid-feedback">{errors.surname[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                onClick={() => clearErrors('name')}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Отчество (необязательно)</label>
              <input
                type="text"
                value={patronym}
                onChange={e => setPatronym(e.target.value)}
                className={`form-control ${errors.patronym ? 'is-invalid' : ''}`}
                onClick={() => clearErrors('patronym')}
              />
              {errors.patronym && (
                <div className="invalid-feedback">{errors.patronym[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Роль</label>
              <select
                className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                onChange={handleRoleChange}
                onClick={() => clearErrors('role')}
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
              {errors.role && (
                <div className="invalid-feedback">{errors.role[0]}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Школа</label>
              <input
                type="text"
                value={school}
                onChange={e => setSchool(e.target.value)}
                className={`form-control ${errors.school ? 'is-invalid' : ''}`}
                onClick={() => clearErrors('school')}
              />
              {errors.school && (
                <div className="invalid-feedback">{errors.school[0]}</div>
              )}
            </div>
            {selectedRole === 'student' && (
              <div className="form-group mb-3 text-start">
                <label className="mb-1">Класс</label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={e => setStudentClass(e.target.value)}
                  className={`form-control ${errors.student_class ? 'is-invalid' : ''}`}
                  onClick={() => clearErrors('student_class')}
                />
                {errors.student_class && (
                  <div className="invalid-feedback">
                    {errors.student_class[0]}
                  </div>
                )}
              </div>
            )}
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Введите ваш пароль"
                onClick={() => clearErrors('password')}
              />
              {errors.password && (
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
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                onClick={() => clearErrors('password')}
                placeholder="Подветрдите ваш пароль"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password[0]}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary col-sm-6 col-md-3 mb-3 mx-auto"
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
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
