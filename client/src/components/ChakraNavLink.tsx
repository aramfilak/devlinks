import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import useScreenSize from '../hooks/useScreenSize';

interface Props {
  to: string;
  children: React.ReactNode;
  icon: JSX.Element;
}

const ChakraNavLink = ({ to, children, icon }: Props) => {
  const { isMobileScreen } = useScreenSize();

  return (
    <Button
      justifyContent={'center'}
      fill={'devlinks.--font-normal'}
      color="devlinks.--font-normal"
      _activeLink={{
        fill: 'devlinks.--ac-cl-1',
        color: 'devlinks.--ac-cl-1',
        backgroundColor: '#EFEBFF',
      }}
      as={NavLink}
      to={to}
    >
      {icon}
      {/** empty space **/}
      {!isMobileScreen ? <> &nbsp;</> : <></>}
      {!isMobileScreen && children}
    </Button>
  );
};

export default ChakraNavLink;
