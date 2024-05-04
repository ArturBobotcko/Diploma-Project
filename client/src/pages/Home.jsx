import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Home = () => {
  const { user, isAuthorized } = useStateContext();

  return <div className="container"></div>;
};

export default Home;
