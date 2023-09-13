import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store';
import { START } from '../data/navlinks';

function RequireAuth() {
  const { user, authToken, removeAuthToken, getUser } = useAuth();

  const fetchUser = async () => {
    const res = await getUser();
    if (res.success) {
      return <Outlet />;
    } else {
      removeAuthToken();
    }
  };

  if (authToken && !user) {
    fetchUser();
  } else if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={START.path} />;
  }
}

export default RequireAuth;
