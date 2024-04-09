import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, useBreakpointValue, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import Hamburger from './Hamburger';
import NavigationLinks from '../NavigationLinks';

const links = [
  { path: '/profile/edit', text: 'Profile' },
  { path: '/account', text: 'Account' },
  { path: '/friendslist', text: 'Friends' },
  { path: '/userlist', text: 'Networking' },
  { path: '/collection', text: 'Collection' },
  { path: '/wishlist', text: 'Wishlist' },
  { path: '/logout', text: 'Logout' },
];

function Header() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const renderNavigationContent = () => {
    if (isMobile) {
      return (
        <>
          <IconButton
            colorScheme="white"
            aria-label="Back"
            icon={<ChevronLeftIcon w={8} h={8} color="white" />}
            justifySelf={'start'}
            onClick={() => navigate(-1)}
          />
          <Heading className="gcn">GCN</Heading>
          <Hamburger links={links}/>
        </>
      );
    }
    return (
      <>
        <Heading className="gcn">GCN</Heading>
        <NavigationLinks links={links}/>
      </>
    );
  };

  return (
    <Box as="header">
      {renderNavigationContent()}
    </Box>
  );
}

export default Header;
