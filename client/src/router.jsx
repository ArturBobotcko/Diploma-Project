import { Navigate, createBrowserRouter } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/user/:userId',
        element: <UserProfile />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/welcome',
        element: <Welcome />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
