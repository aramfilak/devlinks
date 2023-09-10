import './DashboardNavbar.scss';
import { useNavigate } from 'react-router-dom';
import { ILogoMini, ILink, IProfileDetails, ILogoDark, IPreview } from '../../../assets/Icons';
import { Button } from '@chakra-ui/react';
import ChakraNavLink from '../../../components/ChakraNavLink';
import useScreenSize from '../../../hooks/useScreenSize';
import { PROFILE_DETAILS, LINKS, PRIVATE_PREVIEW } from '../../../data/navlinks';

function DashboardNavbar() {
  const { isMobileScreen } = useScreenSize();
  const navigate = useNavigate();

  return (
    <nav className="main-navbar">
      {isMobileScreen ? <ILogoMini /> : <ILogoDark />}

      <ul className="nav-links">
        <li>
          <ChakraNavLink to={LINKS.path} icon={<ILink />}>
            {LINKS.name}
          </ChakraNavLink>
        </li>
        <li>
          <ChakraNavLink to={PROFILE_DETAILS.path} icon={<IProfileDetails />}>
            {PROFILE_DETAILS.name}
          </ChakraNavLink>
        </li>
      </ul>
      <Button
        onClick={() => navigate(PRIVATE_PREVIEW.path)}
        colorScheme="purple"
        _hover={{ background: ' #EFEBFF', color: '#633CFF' }}
        variant={'outline'}
      >
        {!isMobileScreen ? 'Preview' : <IPreview />}
      </Button>
    </nav>
  );
}

export default DashboardNavbar;
