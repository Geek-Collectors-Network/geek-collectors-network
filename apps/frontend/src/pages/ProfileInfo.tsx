import React, { useEffect, useState } from 'react';
import { VStack, StackDivider, Avatar, Button, FormControl, FormLabel, FormErrorMessage, Input, AvatarBadge, Textarea, Select } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { profileSchema } from '../schemas/schemas';
import PageLayout from '../components/PageLayout';
import PageTitle from '../components/PageTitle';

const cities = ['Vancouver', 'Burnaby', 'Richmond', 'Surrey', 'Coquitlam', 'Langley', 'Abbotsford', 'Chilliwack', 'Kelowna'];

type ProfileInfo = {
  username: string;
  dateOfBirth: string;
  city: string;
  about: string;
}

function ProfileInfo() {
  const [initialValues, setInitialValues] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`/api/v1/user/${userId}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setInitialValues(data))
      .catch(error => console.error(error));
  }, []);

  if (!initialValues) {
    return (
      <PageLayout showNavigation={true}>
        <VStack
          bg={'background'}
          spacing={2}
          px={10}
          pt={20}
        >
          <PageTitle title={'Edit Profile'} />
          <div>Loading...</div>
        </VStack>
      </PageLayout>
    );
  }

  return (
    <PageLayout showNavigation={true}>
      <VStack
        bg={'background'}
        spacing={2}
        px={10}
        pt={20}
      >
        <PageTitle title={'Edit Profile'} />
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {formik => (
            <Form style={{ width: '100%' }}>
              <VStack gap={1} divider={<StackDivider/>} >
                <Avatar size={'lg'} mb={4} name={'J D'}>
                  <AvatarBadge boxSize={'1em'} bg="brand.500" border={'1px'} >+</AvatarBadge>
                </Avatar>
                <FormControl id={'username'} isInvalid={!!(formik.errors.username && formik.touched.username)}>
                  <FormLabel color={'gray.500'}>Username:</FormLabel>
                  <Field as={Input} name={'username'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl id={'dateOfBirth'} isInvalid={!!(formik.errors.dateOfBirth && formik.touched.dateOfBirth)}>
                  <FormLabel color={'gray.500'}>Date of Birth:</FormLabel>
                  <Field as={Input} name={'dateOfBirth'} border={'none'} focusBorderColor={'transparent'} placeholder={'MM/DD/YYYY'}></Field>
                  <FormErrorMessage>{formik.errors.dateOfBirth}</FormErrorMessage>
                </FormControl>
                <FormControl id={'city'} isInvalid={!!(formik.errors.city && formik.touched.city)}>
                  <FormLabel color={'gray.500'}>City:</FormLabel>
                  <Field as={Select} name={'city'} border={'none'} focusBorderColor={'transparent'}>
                    <option value={''}>Select a city</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </Field>
                  <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                </FormControl>
                <FormControl id={'about'} isInvalid={!!(formik.errors.about && formik.touched.about)}>
                  <FormLabel color={'gray.500'}>About:</FormLabel>
                  <Field as={Textarea} name={'about'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.about}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  mt={4}
                  w={'100%'}
                  colorScheme="brand"
                  variant="solid"
                  disabled={!formik.dirty || formik.isSubmitting}>
                                SAVE
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>

      </VStack>

    </PageLayout>
  );
}

export default ProfileInfo;
