import React from 'react';

import { Form, Formik, useFormikContext } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from './ValidationSchemas';
import LoginControls from './LoginControls';

function LoginForm() {
  const { isSubmitting } = useFormikContext();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form>
        <VStack gap={4}>
          <TextInput name="email" label="Email:" />
          <TextInput name="password" label="Password:" type="password" />

          <LoginControls />

          <Button
            type="submit"
            w={'100%'}
            colorScheme="brand"
            variant="solid"
            disabled={isSubmitting}>
                LOG IN
          </Button>

          <PageLink text={'Not registered? Sign up!'} to={'/register'}/>
        </VStack>
      </Form>
    </Formik>
  );
}

export default LoginForm;
