import { Button } from '@chakra-ui/react';
import { IDevLinksIL, ILogoDark, ILogoMini } from '../../assets/Icons';
import './Start.scss';
import useScreenSize from '../../hooks/useScreenSize';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../../data/navlinks';

function Start() {
  const { isMobileScreen } = useScreenSize();
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <div className="container">
        <nav>
          {isMobileScreen ? <ILogoMini /> : <ILogoDark />}
          <ul>
            <li>
              <Button
                onClick={() => navigate(SIGN_UP.path)}
                size="lg"
                type="button"
                color="devlinks.--font-light"
                backgroundColor="devlinks.--ac-cl-1"
                colorScheme="purple"
              >
                SignUp
              </Button>
            </li>
            <li>
              <Button
                onClick={() => navigate(LOGIN.path)}
                size="lg"
                type="button"
                color="devlinks.--ac-cl-1"
                backgroundColor="devlinks.--ac-cl-3"
              >
                Login
              </Button>
            </li>
          </ul>
        </nav>

        <section>
          <h1>devlinks</h1>
          <h2>Simplify sharing your links</h2>

          <IDevLinksIL />
        </section>
        <footer>
          {isMobileScreen ? <ILogoMini /> : <ILogoDark />}
          <p>{`© ${new Date().getFullYear()} All rights reserved `}</p>
          <div className="links">
            <p>
              Developed by
              <Link rel="noopener noreferrer" target="_blank" to={'https://www.linkedin.com/in/aram-filak-b0400022a/ '}>
                @Aram Filak.
              </Link>
            </p>
            <p>
              Designed by
              <Link
                target="_blank"
                to={'https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT'}
                rel="noopener noreferrer"
              >
                @Frontend Mentor.
              </Link>
            </p>
            <p>
              Source Code
              <Link target="_blank" to={'https://github.com/aramfilak/devlinks'} rel="noopener noreferrer">
                @Repo.
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Start;
