import React from 'react';
import { VStack } from '@chakra-ui/react';

import UserProfileCard from '../components/UserProfileCard';

function TestPage() {
  return (
    <VStack
      border={'1px solid'}
      spacing={4}
      w={'100%'}
      justify={'center'}
    >
      <UserProfileCard name="John Smith" imageURL="https://picsum.photos/id/237/70/70" />
    </VStack>
  );
}

export default TestPage;
