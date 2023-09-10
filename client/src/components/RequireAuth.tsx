import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store';
import { START } from '../data/navlinks';
import { useEffect } from 'react';
import ChakraSpinner from './ChakraSpinner';

function RequireAuth() {
  const { user, authToken, getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken && !user) {
      (async function fetchUser() {
        const res = await getUser();
        if (!res.success) {
          navigate(START.path);
        }
      })();
    }
  }, [user]);

  if (!user) return <ChakraSpinner />;

  return <Outlet />;
}

export default RequireAuth;
