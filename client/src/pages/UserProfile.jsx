import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

import tg from '../assets/tg.svg';
import vk from '../assets/vk.svg';
import ok from '../assets/ok.svg';
import viber from '../assets/viber.svg';

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [userSocialLinks, setUserSocialLinks] = useState([]);
  const [userParents, setUserParents] = useState([]);
  const [userChildren, setUserChildren] = useState([]);
  const [userStudentClass, setUserStudentClass] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/api/user/${params.userId}`)
      .then(response => {
        setUser(response.data.user);
        setUserSocialLinks(response.data.user.social_links);
        if (response.data.user.role.name === 'student') {
          setUserParents(response.data.user.student.parents);
          setUserStudentClass(response.data.user.student.student_class);
        } else if (response.data.user.role.name === 'parent') {
          setUserChildren(response.data.user.parent.children);
        }
      })
      .catch(err => {
        console.error(err);
        navigate(`/user/${params.userId}`);
      });
  }, []);

  return (
    <div>
      {user && (
        <div className="container">
          <div className="container-fluid p-0">
            <div className="row mb-4">
              <div className="col-lg-3 col-12 mb-4">
                <div className="card text-center text-dark bg-light">
                  <img src="" alt="photo" className="card-img-top" />
                  <div className="card-body">
                    <div className="card-title">
                      <h4>
                        {user.name} {user.surname}
                      </h4>
                    </div>
                    <p className="card-text"></p>
                    <button className="btn btn-primary">Сообщение</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="card text-dark bg-light">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Полное имя</h6>
                      </div>
                      <div className="col-7 col-md-9">
                        {user.surname} {user.name} {user.patronym}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Почта</h6>
                      </div>
                      <div className="col-7 col-md-9">{user.email}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-5 col-md-3">
                        <h6 className="mb-0">Номер телефона</h6>
                      </div>
                      {user.phone_number === null ? (
                        <div className="col-7 col-md-9 text-muted">
                          нет данных
                        </div>
                      ) : (
                        <div className="col-7 col-md-9">
                          {user.phone_number}
                        </div>
                      )}
                    </div>
                    {user.role.name === 'student' && (
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
                                    {element.user.surname} {element.user.name}{' '}
                                    {element.user.patronym}
                                    <br />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {user.role.name === 'parent' &&
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
                                  {element.user.surname} {element.user.name}{' '}
                                  {element.user.patronym}
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
                <div className="card bg-light">
                  <div className="card-body bg-light p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item text-center bg-light text-dark">
                        <h5 className="mb-0">Соц.сети</h5>
                      </li>
                      {userSocialLinks &&
                        !userSocialLinks.vk &&
                        !userSocialLinks.tg &&
                        !userSocialLinks.ok &&
                        !userSocialLinks.viber && (
                          <li className="list-group-item d-flex bg-light flex-row align-items-center text-center">
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
                            href="#"
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
                            href="#"
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
                            href="#"
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
                            href="#"
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
                <div className="card text-dark bg-light">
                  <div className="card-header">Активность</div>
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
