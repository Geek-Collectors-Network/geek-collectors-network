import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import { URLContext } from '../App';
import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from '../schemas/schemas';
import LoginControls from './LoginControls';

function LoginForm() {
  const navigate = useNavigate();
  const url = useContext(URLContext);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={values => {
        fetch(`${url}/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => {
            if (response.ok) {
              navigate('/dashboard');
            } else {
              console.error('Failed to log in');
            }
          });
      }}
    >
      {formik => (
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
