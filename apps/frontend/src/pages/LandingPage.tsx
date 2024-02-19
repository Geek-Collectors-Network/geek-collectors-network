import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, VStack } from '@chakra-ui/react';

function LandingPage() {
  return (
    <VStack
      spacing={4}
      bg="background"
      w={'100vw'}
      h={'100vh'}
      justify={'center'}
    >
      {/* <Image
        src="gcn_logo.svg"
        alt="gcn_logo"
      /> */}
       <Link to="/login">
        <Button
          colorScheme="brand"
          w={'90%'}
        >
          LOGIN
        </Button>
      </Link>
      <Link to="/register">
        <Button
          colorScheme="brand"
          variant="outline"
          w={'90%'}
        >
            SIGN UP
        </Button>
      </Link>
    </VStack>
  );
}

export default LandingPage;
