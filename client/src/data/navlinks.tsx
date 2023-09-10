import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import PageNotFound from '../pages/notfound/PageNotFound';
import Preview from '../pages/preview/Preview';
import ProfileDetails from '../pages/dashboard/layout/ProfileDetails';
import Links from '../pages/dashboard/layout/Links';
import Start from '../pages/start/Start';
import { NavigationLink } from './types';

const START: NavigationLink = {
  name: 'Start',
  path: '/',
  element: <Start />,
};

const NOT_FOUND: NavigationLink = {
  name: 'Page Not Found',
  path: '*',
  element: <PageNotFound />,
};
const PRIVATE_PREVIEW: NavigationLink = {
  name: 'Private Preview',
  path: '/private-preview',
  element: <Preview />,
};

const PUBLIC_PREVIEW: NavigationLink = {
  name: 'Public Profile ',
  path: '/public-preview/:id',
  element: <Preview isPublic />,
};

const LINKS: NavigationLink = {
  name: 'Links',
  path: '/profile-links',
  element: <Links />,
};
const PROFILE_DETAILS: NavigationLink = {
  name: 'Profile Details',
  path: '/profile-details',
  element: <ProfileDetails />,
};
const LOGIN: NavigationLink = {
  name: 'Login',
  path: '/login',
  element: <Login />,
};

const SIGN_UP: NavigationLink = {
  name: 'SignUp',
  path: '/sign-up',
  element: <SignUp />,
};

export { START, PUBLIC_PREVIEW, PRIVATE_PREVIEW, NOT_FOUND, LINKS, PROFILE_DETAILS, LOGIN, SIGN_UP };
