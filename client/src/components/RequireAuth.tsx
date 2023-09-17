import { useAuth } from '../store';
import { START } from '../data/navlinks';
import { useState, useEffect } from 'react';
import ChakraSpinner from './ChakraSpinner';
import { Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
  const { user, authToken, removeAuthToken, getUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setLoading(false);

      if (!res.success) {
        removeAuthToken();
      }
    };

    if (authToken && !user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [authToken, user, getUser, removeAuthToken]);

  if (loading) {
    return <ChakraSpinner />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={START.path} />;
  }
}

export default RequireAuth;
