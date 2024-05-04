import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import NavbarWelcome from './NavbarWelcome';
import Footer from './Footer';

const GuestLayout = () => {
  const { isAuthorized } = useStateContext();
  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <NavbarWelcome />
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

export default GuestLayout;
