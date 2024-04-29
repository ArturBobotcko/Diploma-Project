import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import NotFound from './NotFound';

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/user/${params.userId}`)
      .then(response => {
        console.log(response);
        setUser(response.data.user);
        console.log(user);
      })
      .catch(err => {
        console.error(err);
        setUserNotFound(true);
      });
  }, []);

  return (
    <div>
      {userNotFound && <NotFound />}
      {!userNotFound && (
        <div className="container">{/* TODO: Make a user profile ui */}</div>
      )}
    </div>
  );
};

export default UserProfile;
