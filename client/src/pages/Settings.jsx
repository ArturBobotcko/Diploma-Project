import { useRef, useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

import tg from '../assets/tg.svg';
import vk from '../assets/vk.svg';
import ok from '../assets/ok.svg';
import viber from '../assets/viber.svg';

const Settings = () => {
  const { user } = useStateContext();
  const birthDateRef = useRef();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.user_data) {
      setAvatar('http://localhost:8000/' + user.user_data.avatar);
    }
  }, [user.user_data]);

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="container">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills ">
                  <a
                    href="#profile"
                    data-target="#profile"
                    data-bs-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded d-flex align-items-center gap-2 active"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    <span>Профиль</span>
                  </a>
                  <a
                    href="#security"
                    data-target="#security"
                    data-bs-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded d-flex align-items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-shield"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                    </svg>
                    Безопасность
                  </a>
                  <a
                    href="#notifications"
                    data-target="#notifications"
                    data-bs-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded d-flex align-items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-bell"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                    Уведомления
                  </a>
                  <a
                    href="#account"
                    data-target="#account"
                    data-bs-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded d-flex align-items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                    </svg>
                    Настройки аккаунта
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="tab-content">
              <div className="tab-pane active" id="profile">
                <form onSubmit={handleSubmit}>
                  <div className="card mb-3 text-dark">
                    <div className="card-body">
                      <h6>Персональные данные</h6>
                      <hr />
                      <div className="form-group mb-3">
                        <label htmlFor="avatar" className="mb-2">
                          Фотография
                        </label>
                        <div
                          className="card col-4"
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            document.getElementById('avatar').click()
                          }
                          aria-describedby="avatarHelp"
                        >
                          <img
                            src={avatar}
                            alt="avatar"
                            className="card-img-top"
                            style={{
                              width: '100%', // Ширина равна 100% родительского элемента
                              height: 'auto', // Высота автоматически подстраивается
                              aspectRatio: '1 / 1', // Аспектное соотношение 1:1
                              objectFit: 'cover', // Заполнение всего контейнера
                            }}
                          />
                        </div>
                        <small id="avatarHelp" className="form-text text-muted">
                          Ваша текущая фотография. Нажмите на нее, чтобы выбрать
                          другую
                        </small>
                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/png, image/jpeg"
                          className="form-control"
                          style={{ display: 'none' }}
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="surname" className="mb-2">
                          Фамилия
                        </label>
                        <input
                          type="text"
                          className="form-control text-muted"
                          id="surname"
                          value={user.surname}
                        ></input>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="name" className="mb-2">
                          Имя
                        </label>
                        <input
                          type="text"
                          className="form-control text-muted"
                          id="name"
                          value={user.name}
                        ></input>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="patronym" className="mb-2">
                          Отчество
                        </label>
                        <input
                          type="text"
                          className="form-control text-muted"
                          id="patronym"
                          value={user.patronym}
                        ></input>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="birthDay" className="mb-2">
                          Дата рождения
                        </label>
                        <input
                          type="date"
                          className="form-control text-muted"
                          id="birthDay"
                          defaultValue={user.birth_date}
                          ref={birthDateRef}
                        ></input>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="snils" className="mb-2">
                          СНИЛС
                        </label>
                        <input
                          type="text"
                          className="form-control text-muted"
                          id="snils"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="card text-dark mb-3">
                    <div className="card-body">
                      <h6>Контактные данные</h6>
                      <hr />
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="mb-2">
                          Почта
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control text-muted"
                          defaultValue={user.email}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="phoneNumber" className="mb-2">
                          Номер телефона
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control text-muted"
                          defaultValue={user.phone_number}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card text-dark mb-3">
                    <div className="card-body">
                      <h6>Социальные сети и мессенджеры</h6>
                      <hr />
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-center gap-1 mb-2">
                          <img src={tg} width={24} />{' '}
                          <label htmlFor="tg" className="">
                            Telegram
                          </label>
                        </div>
                        <input
                          type="text"
                          id="tg"
                          className="form-control text-muted"
                          defaultValue={user.social_links.tg}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-center gap-1 mb-2">
                          <img src={vk} width={24} />{' '}
                          <label htmlFor="vk" className="">
                            ВКонтакте
                          </label>
                        </div>
                        <input
                          type="text"
                          id="vk"
                          className="form-control text-muted"
                          defaultValue={user.social_links.vk}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-center gap-1 mb-2">
                          <img src={ok} width={24} />{' '}
                          <label htmlFor="ok" className="">
                            Одноклассники
                          </label>
                        </div>
                        <input
                          type="text"
                          id="ok"
                          className="form-control text-muted"
                          defaultValue={user.social_links.ok}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-center gap-1 mb-2">
                          <img src={viber} width={24} />{' '}
                          <label htmlFor="viber" className="">
                            Viber
                          </label>
                        </div>
                        <input
                          type="text"
                          id="viber"
                          className="form-control text-muted"
                          defaultValue={user.social_links.viber}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Сохранить
                  </button>
                </form>
              </div>

              <div className="tab-pane" id="security">
                <form>
                  <div className="card mb-3 text-dark">
                    <div className="card-body">
                      <h6>Настройки приватности</h6>
                      <hr />
                    </div>
                  </div>
                  <div className="card mb-3 text-dark">
                    <div className="card-body">
                      <h6>Сменить пароль</h6>
                      <hr />
                      <div className="form-group">
                        <label htmlFor="oldPassword" className="mb-2">
                          Новый пароль
                        </label>
                        <input
                          type="password"
                          id="oldPassword"
                          name="oldPassword"
                          className="form-control mb-2 text-muted"
                          placeholder="Введите старый пароль"
                        />
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="form-control mb-2 text-muted"
                          placeholder="Введите новый пароль"
                        />
                        <input
                          type="password"
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          className="form-control mb-2 text-muted"
                          placeholder="Подтвердите новый пароль"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3 text-dark">
                    <div className="card-body">
                      <h6>Сессии</h6>
                      <hr />
                      <p className="text-muted mb-2">
                        Это список устройств, с которых вошли в вашу учетную
                        запись. Отмените сеансы, которые вы не узнаете.
                      </p>
                      <ul className="list-group">
                        <li className="list-group-item has-icon">
                          <h6 className="mb-0">
                            Здесь будет город из сессии и ip адрес
                          </h6>
                          <small className="text-muted">Активная сессия</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="notifications">
                <form>
                  <div className="card mb-3">
                    <div className="card-body text-dark">
                      <h6>Настройки уведомлениями</h6>
                      <hr />
                    </div>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="account">
                <form>
                  <div className="card mb-3">
                    <div className="card-body text-dark">
                      <h6>Управление аккаунтом</h6>
                      <hr />
                      <div className="form-group">
                        <label className="text-danger mb-2">
                          Удалить аккаунт
                        </label>
                        <p className="text-muted mb-0">
                          Удалив аккаунт, восстановить его будет невозможно.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-danger" type="button">
                    Удалить аккаунт
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
