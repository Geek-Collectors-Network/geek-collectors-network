import React from 'react';
import { VStack } from '@chakra-ui/react';

import PageLayout from './PageLayout';
import PageTitle from '../components/PageTitle';
import PageLink from '../components/PageLink';

interface LoginPageProps {
  formComponent: React.ReactNode;
}

// Add Header component created by Toco following rebase / merge
function LoginPage({ formComponent }: LoginPageProps) {
  return (
    <PageLayout>
      <VStack
        bg={'background'}
        px={10}
        pt={20}
      >
        <PageTitle title={'Login'} />
        {formComponent}
      </VStack>
      <PageLink text={"Don't have an account? Sign up!"} to={'/register'} padding={6} />
    </PageLayout>
  );
}

export default LoginPage;
