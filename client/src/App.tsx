import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  LOGIN,
  PROFILE_DETAILS,
  LINKS,
  SIGN_UP,
  START,
  NOT_FOUND,
  PUBLIC_PREVIEW,
  PRIVATE_PREVIEW,
} from './data/navlinks';
import Dashboard from './pages/dashboard/Dashboard';
import RequireAuth from './components/RequireAuth';
import { useEffect } from 'react';
import { useAuth } from './store';
import { isPublicPath } from './utils/helpers';

function App() {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken && isPublicPath(location.pathname)) {
      navigate(PROFILE_DETAILS.path);
    }
  }, []);

  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route path={START.path} element={START.element} />
        <Route path={LOGIN.path} element={LOGIN.element} />
        <Route path={SIGN_UP.path} element={SIGN_UP.element} />
        <Route path={PUBLIC_PREVIEW.path} element={PUBLIC_PREVIEW.element} />
        <Route path={NOT_FOUND.path} element={NOT_FOUND.element} />

        {/*Protected Routes*/}
        <Route element={<RequireAuth />}>
          <Route path={PRIVATE_PREVIEW.path} element={PRIVATE_PREVIEW.element} />
          <Route element={<Dashboard />}>
            <Route path={PROFILE_DETAILS.path} element={PROFILE_DETAILS.element} />
            <Route path={LINKS.path} element={LINKS.element} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
