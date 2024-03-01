import React from 'react';
import { VStack } from '@chakra-ui/react';

import UserProfileCard from '../components/UserProfileCard';

import { EmailIcon, LinkIcon } from '@chakra-ui/icons';

const icons = [
  {
    label: 'Send email',
    icon: <EmailIcon boxSize={8}/>,
  },
  {
    label: 'Connect to social media',
    icon: <LinkIcon boxSize={8}/>,
  },
];

function TestPage() {
  return (
    <VStack
      border={'1px solid'}
      spacing={4}
      w={'100%'}
      justify={'center'}
    >
      <UserProfileCard name="John Smith" imageURL="https://picsum.photos/id/237/70/70" icons={icons}/>
    </VStack>
  );
}

export default TestPage;
