import { Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useStateContext } from '../contexts/ContextProvider';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  // const { user, token } = useStateContext();
  // if (!token) {
  //   return <Navigate to="/welcome" />;
  // }

  const user = useOutletContext();

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <Navbar />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        <div className="container">{user.name}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
