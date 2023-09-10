import { LOGIN, SIGN_UP, START } from '../data/navlinks';

function isPublicPath(path: string): boolean {
  return path === START.path || path === LOGIN.path || path === SIGN_UP.path;
}

export { isPublicPath };
