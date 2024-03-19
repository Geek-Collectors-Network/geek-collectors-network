import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';
import { URLContext } from '../App';
import TextInput from './TextInput';
import PageLink from './PageLink';
import { registrationSchema } from '../schemas/schemas';

function RegistrationForm() {
  const navigate = useNavigate();
  const url = useContext(URLContext);

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={registrationSchema}
      onSubmit={values => {
        fetch(`${url}/api/v1/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => {
            if (response.ok) {
              navigate('/login');
            } else {
              console.error('Failed to sign up');
            }
          });
      }}
    >
      {formik => (
        <Form>
          <VStack gap={4} >
            <TextInput name="firstName" label="First name:" />
            <TextInput name="lastName" label="Last name:" />
            <TextInput name="email" label="Email:" type="email" />
            <TextInput name="password" label="Password:" type="password" />

            <Button
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
