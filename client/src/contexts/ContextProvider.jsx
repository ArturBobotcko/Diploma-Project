import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
  user: null,
  isAuthorized: null,
  setUser: () => {},
  setIsAuthorized: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthorized, _setIsAuthorized] = useState(
    localStorage.getItem('is_authorized'),
  );

  const setIsAuthorized = state => {
    _setIsAuthorized(state);
    if (state) {
      localStorage.setItem('is_authorized', true);
    } else {
      localStorage.removeItem('is_authorized');
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        isAuthorized,
        setUser,
        setIsAuthorized,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
