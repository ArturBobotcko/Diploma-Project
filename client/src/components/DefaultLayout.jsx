import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

const DefaultLayout = () => {
  const { user, isAuthorized, setIsAuthorized, setUser } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const onLogout = event => {
    event.preventDefault();

    axiosClient.post('/logout').then(() => {
      setUser({});
      setIsAuthorized(false);
      navigate('/welcome');
    });
  };

  if (!isAuthorized) {
    return <Navigate to="/welcome" />;
  }

  useEffect(() => {
    axiosClient
      .get('/api/user')
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch(err => {
        console.error(err);
        setIsAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid bg-light p-0 d-flex flex-column min-vh-100">
      {user && !loading ? (
        <Navbar onLogout={onLogout} userId={user.user_data.id} />
      ) : (
        <Navbar onLogout={onLogout} />
      )}

      <div
        className="container-fluid text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
