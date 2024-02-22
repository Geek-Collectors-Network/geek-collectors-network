import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

import PageLink from './PageLink';

// ---------- LOGIN SCHEMA

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter your account email.'),

  password: Yup.string()
    .required('Please enter your password.'),
});

// ---------- REGISTRATION SCHEMA

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

// ---------- GENERAL FORM

type FormType = {
    formType: 'login' | 'registration';
};

function GeneralForm({ formType }: FormType) {
  // Dynamically selects scheme based on the formType.
  const isRegistrationForm = formType === 'registration';
  const schema = isRegistrationForm ? registrationSchema : loginSchema;

  // Dynamically create initial values based on formType
  const initialValues = isRegistrationForm
    ? { firstName: '', lastName: '', email: '', password: '' }
    : { email: '', password: '' };

  const formik = useFormik({
    initialValues,

    validationSchema: schema,

    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack gap={4}>
        {isRegistrationForm && (
          <>
            {/* First Name */}
            <FormControl
              id="firstName"
              isInvalid={!!(formik.touched.firstName && formik.errors.firstName)}
            >
              <FormLabel>First Name:</FormLabel>
              <Input
                type="text"
                focusBorderColor="brand.600"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>

            {/* Last Name */}
            <FormControl
              id="lastName"
              isInvalid={!!(formik.touched.lastName && formik.errors.lastName)}
            >
              <FormLabel>Last Name:</FormLabel>
              <Input
                type="text"
                focusBorderColor="brand.600"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
            </FormControl>
          </>
        )}

        {/* Email */}
        <FormControl
          id="email"
          isInvalid={!!(formik.touched.email && formik.errors.email)}
        >
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            focusBorderColor="brand.600"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl
          id="password"
          isInvalid={!!(formik.touched.password && formik.errors.password)}
        >
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            focusBorderColor="brand.600"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {isRegistrationForm && <FormHelperText>Must be at least 8 characters.</FormHelperText>}
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        {isRegistrationForm ? (
          // Additional fields for registration form
          <HStack w={'100%'} justify={'space-around'}>
            <Checkbox size={['sm', 'md']}>Remember me</Checkbox>
            <Button size={['sm', 'md']} colorScheme="brand" variant="link">
              Forgot password?
            </Button>
          </HStack>
        ) : null}

        <Button
          type="submit"
          w={'100%'}
          colorScheme="brand"
          variant="solid"
          disabled={formik.isSubmitting}
        >
          {isRegistrationForm ? 'SIGN UP' : 'LOG IN'}
        </Button>

        {isRegistrationForm ? (
          <PageLink text={'Already have an account? Log in!'} to={'/login'} paddingBottom={20} />
        ) : (
          <PageLink text={'Don\'t have an account? Sign up!'} to={'/register'} paddingBottom={20} />
        )}
      </VStack>
    </form>
  );
}

export default GeneralForm;
