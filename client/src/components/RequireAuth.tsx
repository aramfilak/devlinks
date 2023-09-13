import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store';
import { START } from '../data/navlinks';
import { useState } from 'react';
import ChakraSpinner from './ChakraSpinner';

function RequireAuth() {
  const { user, authToken, removeAuthToken, getUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const res = await getUser();
    setLoading(false);

    if (!res.success) {
      removeAuthToken();
    }
  };

  if (loading) {
    return <ChakraSpinner />;
  }

  if (authToken && !user) {
    fetchUser();
  } else if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={START.path} />;
  }
}

export default RequireAuth;
