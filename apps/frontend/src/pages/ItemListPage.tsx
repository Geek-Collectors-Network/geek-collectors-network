import React from 'react';
import { useLocation } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';

import ItemList from '../components/ItemList';
import PageLayout from '../components/PageLayout';
import { addToCollectionButton, addToWishlistButton, removeFromCollectionButton, removeFromWishlistButton } from '../components/CardButtons';


function ItemFeedPage() {
  const url = '/api/v1/item/feed';

  return (
    <PageLayout>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
          buttons={[addToCollectionButton, addToWishlistButton]}
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
  const buttons = userId ? [addToWishlistButton] : [removeFromCollectionButton];

  return (
    <PageLayout>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
          buttons={buttons}

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
  const buttons = userId ? [addToWishlistButton] : [removeFromWishlistButton];

  return (
    <PageLayout>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
          buttons={buttons}
        />
      </VStack>
    </PageLayout>
  );
}

export { ItemFeedPage, ItemCollectionPage, ItemWishlistPage };
