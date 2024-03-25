import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';
import TextInput from './TextInput';
import PageLink from './PageLink';
import { registrationSchema } from '../schemas/schemas';

type RegionTextInputProps = {
  name: string,
  country: string
}

function signUp(navigate: (path: string) => void, values: Record<string, string>) {
  fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(response => {
      const { data, isError } = response;

      if (isError) return console.error(data);

      return navigate('/login');
    });
}

const provinceCountries = ['canada'];
const stateCountries = ['united states'];
const territoryCountries = ['australia'];

function RegionTextInput({ name, country }: RegionTextInputProps) {
  if (provinceCountries.includes(country.toLowerCase())) {
    return <TextInput name={name} label="Province:" />;
  }

  if (stateCountries.includes(country.toLowerCase())) {
    return <TextInput name={name} label="State:" />;
  }

  if (territoryCountries.includes(country.toLowerCase())) {
    return <TextInput name={name} label="Territory:" />;
  }

  return <TextInput name={name} label="Province:" />;
}

function RegistrationForm() {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', country, region: '', city: '' }}
      validationSchema={registrationSchema}
      onSubmit={signUp.bind(null, navigate)}
    >
      {formik => (
        <Form>
          <VStack gap={4} >
            <TextInput name="firstName" label="First name:" />
            <TextInput name="lastName" label="Last name:" />
            <TextInput name="email" label="Email:" type="email" />
            <TextInput name="password" label="Password:" type="password" />
            <TextInput name="country" label="Country:" onChange={e => setCountry(e.target.value)} />
            <RegionTextInput name="region" country={country} />
            <TextInput name="city" label="City:" />

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
