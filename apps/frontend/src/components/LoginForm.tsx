import React from 'react';

import { Form, Formik } from 'formik';
import { Button, Checkbox, HStack, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from './ValidationSchemas';

function LoginControls() {
  return (
    <HStack w={'100%'} justify={'space-around'}>
      <Checkbox size={['sm', 'md']}>
        Remember me
      </Checkbox>

      <Button size={['sm', 'md']} colorScheme="brand" variant="link">
        Forgot password?
      </Button>
    </HStack>
  );
}

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {formik => (
        <Form>
          <VStack gap={4}>
            <TextInput name="email" label="Email" />
            <TextInput name="password" label="Password" type="password" />

            <LoginControls />

            <Button
              type="submit"
              w={'100%'}
              colorScheme="brand"
              variant="solid"
              disabled={formik.isSubmitting}>
                LOG IN
            </Button>

            <PageLink text={'Not registered? Sign up!'} to={'/register'}/>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
