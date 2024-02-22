import React from 'react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Checkbox, HStack, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';


const registrationSchema = Yup.object({
  firstName: Yup.string()
    .required('Please enter your first name.'),

  lastName: Yup.string()
    .required('Please enter your last name.'),

  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter your account email.'),

  // Passwords has additional validation for registration
  password: Yup.string()
    .min(8, 'Must be at least 8 characters.')
    .required(),
});


function RegistrationForm2() {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={registrationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {formik => (
        <Form>
          <VStack gap={4} w={'100%'}>
            <TextInput name="firstName" label="First name:" />
            <TextInput name="lastName" label="Last name:" />
            <TextInput name="email" label="Email:" type="email" />
            <TextInput name="password" label="Password:" type="password" />

            <HStack w={'100%'} justify={'space-around'}>
              <Checkbox size={['sm', 'md']}>Remember me</Checkbox>

              <Button size={['sm', 'md']} colorScheme="brand" variant="link">
            Forgot password?
              </Button>
            </HStack>

            <Button type="submit" w={'100%'} colorScheme="brand" variant="solid" disabled={formik.isSubmitting}>
                SIGN UP
            </Button>

            <PageLink text={'Already have an account? Log in!'} to={'/login'}/>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm2;
