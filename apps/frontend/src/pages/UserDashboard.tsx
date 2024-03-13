import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, HStack, StackDivider, Heading } from '@chakra-ui/react';
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
        <Heading size={'md'} alignSelf={'center'} justifySelf={'center'} mb={4} >
            Profile & Settings
        </Heading>
        <Link to={'/'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Heading size={'sm'}>Account Information</Heading>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <Link to={'/'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Heading size={'sm'}>Profile</Heading>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <Link to={'/'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Heading size={'sm'}>Friends List</Heading>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <Link to={'/'} style={{ width: '100%' }}>
          <HStack w={'100%'} justify={'space-between'}>
            <Heading size={'sm'}>Item Collection</Heading>
            <ArrowRightIcon w={4} h={4} color="brand.500" />
          </HStack>
        </Link>
        <></>
      </VStack>
    </PageLayout>
  );
}

export default UserDashboard;
