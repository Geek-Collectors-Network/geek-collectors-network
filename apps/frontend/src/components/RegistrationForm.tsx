import React from 'react';

import { Form, Formik, useFormikContext } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { registrationSchema } from './ValidationSchemas';
import LoginControls from './LoginControls';

function RegistrationForm() {
  const { isSubmitting } = useFormikContext();

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={registrationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form>
        <VStack gap={4} >
          <TextInput name="firstName" label="First name:" />
          <TextInput name="lastName" label="Last name:" />
          <TextInput name="email" label="Email:" type="email" />
          <TextInput name="password" label="Password:" type="password" />

          <LoginControls />

          <Button
            type="submit"
            w={'100%'}
            colorScheme="brand"
            variant="solid"
            disabled={isSubmitting}>
                SIGN UP
          </Button>

          <PageLink text={'Already have an account? Log in!'} to={'/login'}/>
        </VStack>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;
