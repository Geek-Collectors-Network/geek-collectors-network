import React from 'react';
import { VStack } from '@chakra-ui/react';

import ItemList from '../components/ItemList';
import PageLayout from '../components/PageLayout';


function ItemCollectionPage() {
  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={'/api/v1/user/collection'}
        />
      </VStack>
    </PageLayout>
  );
}

function ItemWishlistPage() {
  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={'/api/v1/user/wishlist'}
        />
      </VStack>
    </PageLayout>
  );
}

export { ItemCollectionPage, ItemWishlistPage };
