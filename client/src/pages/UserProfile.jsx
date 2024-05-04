import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import NotFound from './NotFound';

import tg from '../assets/tg.svg';
import vk from '../assets/vk.svg';
import ok from '../assets/ok.svg';
import viber from '../assets/viber.svg';

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [userSocialLinks, setUserSocialLinks] = useState();
  // const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/user/${params.userId}`)
      .then(response => {
        console.log('/user/id запрос');
        setUser(response.data.user);
        // setUserSocialLinks(response.data.social_links[0]);
        console.log(user);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {user === null && <NotFound />}
      {user && (
        <div className="container">
          <div className="container-fluid p-0">
            <div className="row mb-4">
              <div className="col-3">
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
              <div className="col">
                <div className="card text-dark bg-light">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <h6 className="mb-0">Полное имя</h6>
                      </div>
                      <div className="col">
                        {user.surname} {user.name} {user.patronym}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <h6 className="mb-0">Почта</h6>
                      </div>
                      <div className="col">{user.email}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <h6 className="mb-0">Номер телефона</h6>
                      </div>
                      <div className="col">{user.phone_number}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <h6 className="mb-0">Школа</h6>
                      </div>
                      <div className="col">{user.school}</div>
                    </div>
                    {user.role === 'student' && (
                      <>
                        <hr />
                        <div className="row">
                          <div className="col-3">
                            <h6 className="mb-0">Класс</h6>
                          </div>
                          <div className="col">{user.student_class}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-3">
                            <h6 className="mb-0">Родители</h6>
                          </div>
                          <div className="col">Родители</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-muted">
              <div className="col-3 ">
                <div className="card bg-light">
                  <div className="card-body bg-light p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item text-center bg-light text-dark">
                        <h5 className="mb-0">Соц.сети</h5>
                      </li>
                      {userSocialLinks === undefined ||
                        (!userSocialLinks.vk &&
                          !userSocialLinks.tg &&
                          !userSocialLinks.ok &&
                          !userSocialLinks.viber && (
                            <li className="list-group-item d-flex bg-light flex-row align-items-center text-center">
                              <h6 className="mb-0 me-2">
                                Пользователь не указал ни одной социальной сети
                              </h6>
                            </li>
                          ))}
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
              <div className="col">
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
