import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack, useToast } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { registrationSchema } from '../schemas/schemas';

type RegistrationValues = {
  firstName: string,
  lastName: string,
  email: string;
  password: string;
};

async function registration(values: RegistrationValues) {
  try {
    const response = await fetch('/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Error with Network Request');
    }

    const data = await response.json();
    if (data.isError) {
      console.error(data.data);
      return false;
    }
    return true;
  } catch (error) {
    console.log('Registration failed: ', error);
    return false;
  }
}

function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values : RegistrationValues) => {
    setIsLoading(true);
    const success = await registration(values);

    if (success) {
      toast({
        title: 'You\'ve successfully registered!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } else {
      toast({
        title: 'Whoops! Registration failed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <VStack gap={4} >
            <TextInput name="firstName" label="First name:" />
            <TextInput name="lastName" label="Last name:" />
            <TextInput name="email" label="Email:" type="email" />
            <TextInput name="password" label="Password:" type="password" />

            <Button
              isLoading={isLoading}
              type="submit"
              w={'100%'}
              colorScheme="brand"
              variant="solid"
              disabled={formik.isSubmitting}>
                SIGN UP
            </Button>

            <PageLink text={'Already have an account? Log in!'} to={'/login'}/>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;
