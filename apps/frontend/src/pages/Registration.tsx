import React from 'react';
import { VStack } from '@chakra-ui/react';

import PageLayout from './PageLayout';
import PageTitle from '../components/PageTitle';
// import RegistrationForm from '../components/RegistrationForm';

type LoginPageProps = {
  formComponent: React.ReactNode;
}

function Registration({ formComponent }: LoginPageProps) {
  return (
    <PageLayout >
      <VStack
        bg={'background'}
        px={10}
        pt={20}
      >
        <PageTitle title={'Sign Up'} />
        {formComponent}
      </VStack>
    </ PageLayout>
  );
}

export default Registration;
