import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import axiosClient from '../axios-client';

const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/welcome" />;
  }

  const onLogout = event => {
    event.preventDefault();

    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <Navbar onLogout={onLogout} />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
