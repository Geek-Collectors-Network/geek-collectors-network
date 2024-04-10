import React from 'react';
import { useLocation } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';

import ItemList from '../components/ItemList';
import PageLayout from '../components/PageLayout';
import { addToCollectionButton, addToWishlistButton, deleteItemButton } from '../components/CardButtons';


function ItemFeedPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/collection?id=${userId}` : '/api/v1/user/collection';

  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
          buttons={[
            addToCollectionButton,
            addToWishlistButton,
            deleteItemButton,
          ]}
        />
      </VStack>
    </PageLayout>
  );
}

function ItemCollectionPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/collection?id=${userId}` : '/api/v1/user/collection';

  return (
    <PageLayout>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
          buttons={[deleteItemButton]}

        />
      </VStack>
    </PageLayout>
  );
}

function ItemWishlistPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/wishlist?id=${userId}` : '/api/v1/user/wishlist';

  return (
    <PageLayout>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
          buttons={[deleteItemButton]}
        />
      </VStack>
    </PageLayout>
  );
}

export { ItemFeedPage, ItemCollectionPage, ItemWishlistPage };
