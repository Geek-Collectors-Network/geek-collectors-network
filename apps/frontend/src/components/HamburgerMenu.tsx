import React from 'react';
import { Link } from 'react-router-dom';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

type HamburgerMenuProps = {
    links: { path: string; text: string }[];
};

function HamburgerMenu({ links }: HamburgerMenuProps) {
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          colorScheme="brand"
          aria-label="Pages"
          icon={<HamburgerIcon w={8} h={8} color="white" />}
        >
          MENU
        </MenuButton>
        <MenuList>
          {links.map(({ path, text }) => (
            <Link key={path} to={path}>
              <MenuItem fontSize="xl">
                {text}
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default HamburgerMenu;
