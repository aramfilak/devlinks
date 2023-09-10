import 'react';
import ProfileDetails from '../pages/dashboard/layout/ProfileDetails';

export interface NavigationLink {
  name: string;
  path: string;
  element: JSX.Element;
}

export interface PlatForm {
  icon: JSX.Element;
  name: string;
  color: string;
  url: string;
}

export interface DevLink {
  platform: string;
  url: string;
}

export interface ProfileDetails {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  bio: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  bio: string;
  links: DevLink[];
}
