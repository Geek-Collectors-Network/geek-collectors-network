import React from 'react';

import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from './ValidationSchemas';
import LoginControls from './LoginControls';

function LoginForm() {
  const formik = useFormik({
    /* These are the initial state of the form fields -- the
    state the user sees when they navigate to this page. */
    initialValues: {
      email: '',
      password: '',
    },
    /* This is the validation schema that the form will use
    to validate the form fields. */
    validationSchema: loginValidationSchema,

    /* If validation schema passes, the
    values will be submitted. */
    onSubmit: validatedValues => {
      console.log(validatedValues);
    },
  });

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
