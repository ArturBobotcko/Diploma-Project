import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import NotFound from './NotFound';

import tg from '../assets/tg.svg';
import vk from '../assets/vk.svg';
import ok from '../assets/ok.svg';
import viber from '../assets/viber.svg';

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSocialLinks, setUserSocialLinks] = useState([]);
  const [userParents, setUserParents] = useState([]);
  const [userChildren, setUserChildren] = useState([]);
  const [userStudentClass, setUserStudentClass] = useState();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/api/user/${params.userId}`)
      .then(response => {
        setUser(response.data.user);
        setUserSocialLinks(response.data.user.social_links);
        setUserRole(response.data.user.role);
        if (response.data.user.role.name === 'student') {
          setUserParents(response.data.user.parents);
          setUserStudentClass(response.data.user.student_class);
        } else if (response.data.user.role.name === 'parent') {
          setUserChildren(response.data.user.children);
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.userId]);

  if (loading) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <NotFound />;
  }

  const formatBirthDate = birthDate => {
    const dateParts = birthDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    const monthName = months[month - 1];

    return `${day} ${monthName} ${year}`;
  };

  const getAge = dateString => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} ${getYearWord(age)}`;
  };

  const getYearWord = age => {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'лет';
    } else if (lastDigit === 1) {
      return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return 'года';
    } else {
      return 'лет';
    }
  };

  return (
    <div>
      {user && (
        <div className="container">
          <div className="container-fluid p-0">
            <div className="row mb-4">
              <div className="col-lg-3 col-12 mb-4">
                <div className="card text-center text-dark">
                  <img
                    src={'http://localhost:8000/' + user.user_data.avatar}
                    alt="avatar"
                    className="card-img-top"
                    style={{
                      width: '100%', // Ширина равна 100% родительского элемента
                      height: 'auto', // Высота автоматически подстраивается
                      aspectRatio: '1 / 1', // Аспектное соотношение 1:1
                      objectFit: 'cover', // Заполнение всего контейнера
                    }}
                  />
                  <div className="card-body">
                    <div className="card-title">
                      <h4>
                        {user.user_data.name} {user.user_data.surname}
                      </h4>
                    </div>
                    <p className="card-text"></p>
                    <button className="btn btn-primary">Сообщение</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="card text-dark">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Полное имя</h6>
                      </div>
                      <div className="col-7 col-md-9">
                        {user.user_data.surname} {user.user_data.name}{' '}
                        {user.user_data.patronym}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Дата рождения</h6>
                      </div>

                      {user.user_data.birth_date === null ? (
                        <div className="col-7 col-md-9 text-muted">
                          нет данных
                        </div>
                      ) : (
                        <div className="col-7 col-md-9">
                          {formatBirthDate(user.user_data.birth_date)} (
                          {getAge(user.user_data.birth_date)})
                        </div>
                      )}
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Почта</h6>
                      </div>
                      <div className="col-7 col-md-9">
                        {user.user_data.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Номер телефона</h6>
                      </div>
                      {user.user_data.phone_number === null ? (
                        <div className="col-7 col-md-9 text-muted">
                          нет данных
                        </div>
                      ) : (
                        <div className="col-7 col-md-9">
                          {user.user_data.phone_number}
                        </div>
                      )}
                    </div>
                    {userRole.name === 'student' && (
                      <>
                        <hr />
                        <div className="row">
                          <div className="col-5 col-md-3">
                            <h6 className="mb-0">Класс</h6>
                          </div>
                          {userStudentClass === null ? (
                            <div className="col-7 col-md-9 text-muted">
                              нет данных
                            </div>
                          ) : (
                            <div className="col-7 col-md-9">
                              {userStudentClass.number} &quot;
                              {userStudentClass.letter}&quot;
                            </div>
                          )}
                        </div>
                        {userParents.length !== 0 && (
                          <>
                            <hr />
                            <div className="row">
                              <div className="col-5 col-md-3">
                                <h6 className="mb-0">Родители</h6>
                              </div>
                              <div className="col-7 col-md-9 d-flex flex-column gap-2">
                                {userParents.map((element, index) => (
                                  <a
                                    className="link-primary"
                                    key={index}
                                    href={'/user/' + element.id}
                                  >
                                    {element.surname} {element.name}{' '}
                                    {element.patronym}
                                    <br />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {userRole.name === 'parent' &&
                      userChildren.length !== 0 && (
                        <>
                          <hr />
                          <div className="row">
                            <div className="col-5 col-md-3">
                              <h6 className="mb-0">Дети</h6>
                            </div>
                            <div className="col-7 col-md-9">
                              {userChildren.map((element, index) => (
                                <a
                                  className="link-primary"
                                  key={index}
                                  href={'/user/' + element.id}
                                >
                                  {element.surname} {element.name}{' '}
                                  {element.patronym}
                                  <br />
                                </a>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-muted">
              <div className="col-lg-3 col-12 mb-4">
                <div className="card ">
                  <div className="card-body  p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item text-center text-dark">
                        <h5 className="mb-0">Соц.сети</h5>
                      </li>
                      {userSocialLinks &&
                        !userSocialLinks.vk &&
                        !userSocialLinks.tg &&
                        !userSocialLinks.ok &&
                        !userSocialLinks.viber && (
                          <li className="list-group-item d-flex  flex-row align-items-center text-center">
                            <h6 className="mb-0 me-2">
                              Пользователь не указал ни одной социальной сети
                            </h6>
                          </li>
                        )}
                      {userSocialLinks && userSocialLinks.vk && (
                        <li className="list-group-item d-flex flex-row align-items-center">
                          <h6 className="mb-0 me-2">
                            <img src={vk} width={24} height={24} />
                          </h6>
                          <a
                            className="text-decoration-none link-info"
                            href={userSocialLinks.vk}
                          >
                            ВКонтакте
                          </a>
                        </li>
                      )}
                      {userSocialLinks && userSocialLinks.tg && (
                        <li className="list-group-item d-flex flex-row align-items-center">
                          <h6 className="mb-0 me-2">
                            <img src={tg} alt="" width={24} height={24} />
                          </h6>
                          <a
                            className="text-decoration-none link-info"
                            href={userSocialLinks.tg}
                          >
                            Telegram
                          </a>
                        </li>
                      )}
                      {userSocialLinks && userSocialLinks.ok && (
                        <li className="list-group-item d-flex flex-row align-items-center">
                          <h6 className="mb-0 me-2">
                            <img src={ok} alt="" width={24} height={24} />
                          </h6>
                          <a
                            className="text-decoration-none link-info"
                            href={userSocialLinks.ok}
                          >
                            Одноклассники
                          </a>
                        </li>
                      )}
                      {userSocialLinks && userSocialLinks.viber && (
                        <li className="list-group-item d-flex flex-row align-items-center">
                          <h6 className="mb-0 me-2">
                            <img src={viber} alt="" width={24} height={24} />
                          </h6>
                          <a
                            className="text-decoration-none link-info"
                            href={userSocialLinks.viber}
                          >
                            Viber
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="card text-dark ">
                  <div className="card-header bg-white">Активность</div>
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
