import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, IconButton, useBreakpointValue, Text } from '@chakra-ui/react';
import NavigationLinks from './NavigationLinks';
import HamburgerMenu from './HamburgerMenu';
import { ChevronLeftIcon } from '@chakra-ui/icons';


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
  const link = links.find(link_ => link_.path === location.pathname);
  const pageTitle = link ? link.text : '';

  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  // Function to render navigation content
  const renderNavigationContent = () => {
    if (showNavigation) {
      if (isMobile) {
        return (
          <Flex align="center" justify="space-between">
            <IconButton
              colorScheme="white"
              aria-label="Back"
              icon={<ChevronLeftIcon w={8} h={8} color="white" />}
              justifySelf={'start'}
              onClick={() => navigate(-1)}
            />
            <Text color="white" fontWeight="bold" fontSize="xl">{pageTitle}</Text>
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
