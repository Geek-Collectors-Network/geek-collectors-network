import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, IconButton, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NavigationLinks from './NavigationLinks';
import HamburgerMenu from './HamburgerMenu';

type HeaderProps = {
  showNavigation: boolean;
};

const links = [
  { path: '/account', text: 'Account Info' },
  { path: '/profile/edit', text: 'Profile' },
  { path: '/friendslist', text: 'Friends List' },
  { path: '/collection', text: 'Personal Collection' },
  { path: '/wishlist', text: 'Wishlist' },
];

function Header({ showNavigation }: HeaderProps) {
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Function to render navigation content
  const renderNavigationContent = () => {
    if (showNavigation) {
      if (isMobile) {
        return (
          <Flex align="center" justify={'space-evenly'}>
            <h1>{location.pathname}</h1>
            <HamburgerMenu links={links}/>
          </Flex>
        );
      }
      return (
        <Flex align="center">
          <NavigationLinks links={links}/>
        </Flex>
      );
    }
    return <Box w={8} h={8} />;
  };

  return (
    <Box as="header" bg="brand.500" p={3} zIndex="sticky" top={0}>

      {renderNavigationContent()}

    </Box>
  );
}

export default Header;
