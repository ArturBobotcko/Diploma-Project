import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Home = () => {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/welcome" />;
  }

  return <div className="container"></div>;
};

export default Home;
