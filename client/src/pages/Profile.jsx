import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Используйте state для хранения данных пользователя

  useEffect(() => {
    const getUserData = async () => {
      try {
        const API_URL = `http://localhost:8000/api/users/${params.userId}`;
        const response = await axios.get(API_URL);
        setUserData(response.data); // Устанавливаем данные пользователя в state
        console.log(response.data);
      } catch (error) {
        console.error(error);
        navigate('/not-found');
      }
    };

    getUserData(); // Вызываем функцию получения данных пользователя
  }, [params.userId]); // Добавляем params.userId в зависимости, чтобы useEffect срабатывал при изменении параметра userId

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <Navbar />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        {userData ? (
          <div className="container d-flex flex-column">
            <div className="container-fluid">
              <div className="row mb-3">
                <label className="form-label p-0">Почта</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={userData.email}
                ></input>
              </div>
              <div className="row mb-3">
                <label className="form-label p-0">Фамилия</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={userData.surname}
                ></input>
              </div>
              <div className="row mb-3">
                <label className="form-label p-0">Имя</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={userData.name}
                ></input>
              </div>
              <div className="row mb-3">
                <label className="form-label p-0">Отчество</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={userData.patronym}
                ></input>
              </div>
              <div className="row mb-3">
                <label className="form-label p-0">Роль</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={userData.role}
                ></input>
              </div>
              <div className="row mb-3">
                <label className="form-label p-0">Школа</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={userData.school}
                ></input>
              </div>
              {userData.role === 'student' && (
                <div className="row mb-3">
                  <label className="form-label p-0">Класс</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={userData.student_class}
                  ></input>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="container">
            <p>Lodaing...</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
