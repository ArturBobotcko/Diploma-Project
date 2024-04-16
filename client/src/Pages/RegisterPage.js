import React, { useState } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import Footer from "../Components/Footer";

const RegisterPage = ({ onToggleForm }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronym, setPatronym] = useState("");
  const [role, setRole] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [schoolError, setSchoolError] = useState(false);
  const [studentClassError, setStudentClassError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const roles = [
    {
      value: "teacher",
      label: "Я - Преподаватель",
    },
    {
      value: "student",
      label: "Я - Ученик",
    },
  ];

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setRole(event.target.value); // Обновляем также значение поля роли
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setSurnameError(false);
    setNameError(false);
    setRoleError(false);
    setSchoolError(false);
    setPasswordError(false);
    setStudentClassError(false);
    setConfirmPasswordError(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !surname || !name || !role || !school || !password || !confirmPassword || (role === 'student' && !studentClass)) {
      // Если одно из обязательных полей пустое, устанавливаем соответствующее состояние ошибки
      setEmailError(!email);
      setSurnameError(!surname);
      setNameError(!name);
      setRoleError(!role);
      setSchoolError(!school);
      setPasswordError(!password);
      setStudentClassError(!studentClass);
      setConfirmPasswordError(!confirmPassword);
      return; // Останавливаем процесс отправки формы
    }

    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email":email,
          "surname":surname,
          "name":name,
          "patronym":patronym,
          "role":role,
          "class":studentClass,
          "school":school,
          "password":password,
          "password_confirmation":confirmPassword,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Ошибка HTPP: " + response.status);
      }

      setEmail("");
      setSurname("");
      setName("");
      setPatronym("");
      setRole("");
      setStudentClass("");
      setSchool("");
      setPassword("");
      setConfirmPassword("");

      const responseData = await response.json();
      console.log(responseData); // Выводим ответ сервера в консоль
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="container-fluid bg-white text-secondary my-5" style={{ flex: "1 0 auto" }}>
        <div className="container d-flex flex-column">
          <h5 className="text-center">Регистрация</h5>
          <form className="d-flex flex-column col-sm-12 mx-sm-0 col-md-6 mx-md-auto" onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Введите ваш адрес электронной почты"></input>
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Фамилия</label>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} className="form-control"></input>
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Имя</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"></input>
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Отчество (необязательно)</label>
              <input type="text" value={patronym} onChange={(e) => setPatronym(e.target.value)} className="form-control"></input>
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Роль</label>
              <select className="form-select" onChange={handleRoleChange}>
                <option selected value="">Выберите роль</option>
                {roles.map((role, index) =>(
                  <option key={index} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Школа</label>
              <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} className="form-control"></input>
            </div>
            {selectedRole === "student" && (
              <div className="form-group mb-3 text-start">
                <label className="mb-1">Класс</label>
                <input type="text" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} className="form-control"></input>
              </div>
            )}
            <div className="form-group mb-3 text-start">
              <label className="mb-1">Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Введите ваш пароль"></input>
            </div>
            <div className="form-group mb-4 text-start">
              <label className="mb-1">Подтвердите пароль</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Подветрдите ваш пароль"></input>
            </div>
            <button type="submit" className="btn btn-primary col-sm-6 col-md-3 mb-3 mx-auto">Регистрация</button>
            <div className="container-fluid p-0 d-flex flex-row justify-content-center">
              <p className="m-0">У вас уже есть аккаунт?&nbsp;</p>
              <p className="m-0"><a class="link-opacity-75-hover" href="/">Войти</a></p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
