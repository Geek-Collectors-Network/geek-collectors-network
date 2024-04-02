import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
          // colorScheme="brand"
          // aria-label="Hamburger Menu"
          // rightIcon={<HamburgerIcon w={8} h={8} color="white" />}
        >
          MENU
        </MenuButton>
        <MenuList>
          {links.map(({ path, text }) => (
            <Link key={path} to={path}>
              <MenuItem>
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
