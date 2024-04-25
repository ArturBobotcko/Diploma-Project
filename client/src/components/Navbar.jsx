import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import useCurrentUser from '../hooks/useCurrentUser';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const logout = async () => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    const API_URL = 'http://localhost:8000/api/logout';
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios
      .get(API_URL, { headers: headers })
      .then(response => {
        console.log(response.data);
        Cookies.remove('token');
        navigate('/');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  // useEffect(() => {
  //   const getLoggedUserId = async () => {
  //     const token = Cookies.get('token');
  //     if (!token) {
  //       return;
  //     }
  //     const API_URL = 'http://localhost:8000/api/profile';
  //     const headers = {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios
  //       .get(API_URL, { headers: headers })
  //       .then(response => {
  //         // return response.data.id;
  //         setUserId(response.data.id);
  //       })
  //       .catch(error => {
  //         console.error('Error logging out:', error);
  //       });
  //   };

  //   getLoggedUserId();
  //   console.log(userId);
  // }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      {currentUser && currentUser.id && (
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} width="36" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Оценки
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Задания
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Сообщения
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Профиль
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href={`/id/${currentUser.id}`}>
                      Профиль
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item" href="#">
                      Настройки
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" href="#" onClick={logout}>
                      Выйти
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
