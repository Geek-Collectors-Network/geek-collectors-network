import React from 'react';

import { AddIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons'; // Assuming ViewIcon for opening modal

type CardButton = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
  colorScheme?: string,
  onClick?: () => void
}

const addToCollectionButton = (itemId: number) => ({
  label: 'Add to Collection',
  icon: <AddIcon />,
  variant: 'solid',
  colorScheme: 'brand',
  onClick: () => {
    console.log(`Adding item ${itemId} to Collection...`);
    fetch('/api/v1/user/collection', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
});

const addToWishlistButton = (itemId: number) => ({
  label: 'Add to Wishlist',
  icon: <StarIcon />,
  variant: 'solid',
  colorScheme: 'brand',
  onClick: () => {
    console.log(`Adding item ${itemId} to Wishlist...`);
    fetch('/api/v1/user/wishlist', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
});

const deleteItemButton = (itemId: number) => ({
  label: 'Delete Item',
  icon: <DeleteIcon />,
  variant: 'outline',
  colorScheme: 'brand',
  onClick: () => console.log(`Deleting item ${itemId} from _____`), // Placeholder functionality
});

export { addToCollectionButton, addToWishlistButton, deleteItemButton, CardButton };
