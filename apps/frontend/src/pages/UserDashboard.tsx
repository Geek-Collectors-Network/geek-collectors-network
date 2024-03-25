import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, HStack, StackDivider, Heading, Text } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

import PageLayout from '../components/PageLayout';


function UserDashboard() {
  return (
    <PageLayout showNavigation={false}>
      <VStack
        bg={'background'}
        divider={<StackDivider borderWidth={'1px'} />}
        spacing={8}
        px={10}
        pt={20}
      >
        <Heading size={'sm'} alignSelf={'center'} justifySelf={'center'} mb={4} >
            Profile & Settings
        </Heading>
        <Link to={'/account'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Text>Account Information</Text>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <Link to={'/profile/edit'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Text>Profile</Text>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <Link to={'/friendslist'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Text>Friends List</Text>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <Link to={'/itemlist'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Text>Item Collection</Text>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <></>
      </VStack>
    </PageLayout>
  );
}

export default UserDashboard;
