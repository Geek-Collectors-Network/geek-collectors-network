import React, { useEffect, useState } from 'react';
import { VStack, StackDivider, Avatar, Button, FormControl, FormLabel, FormErrorMessage, Input, AvatarBadge, Textarea, Select } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { profileSchema } from '../schemas/schemas';
import PageLayout from '../components/PageLayout';
import PageTitle from '../components/PageTitle';
import TagInput from '../components/TagInput';

const cities = ['Vancouver', 'Burnaby', 'Richmond', 'Surrey', 'Coquitlam', 'Langley', 'Abbotsford', 'Chilliwack', 'Kelowna'];

type ProfileInfo = {
  email: string;
  birthDate: string;
  city: string;
  about: string;
}

function formatDate(date: Date) {
  const month = date.getUTCMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

  return formattedDate;
}

function ProfileInfo() {
  const [initialValues, setInitialValues] = useState<ProfileInfo | null>(null);
  const [tags, setTags] = useState<string[]>(['Interest', 'Another Interest', 'One More Interest', 'Last Interest']);

  useEffect(() => {
    fetch('/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({ data }) => setInitialValues({
        ...data,
        birthDate: formatDate(new Date(data.birthDate)),
      }))
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
        py={20}
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
                <FormControl id={'email'} isInvalid={!!(formik.errors.email && formik.touched.email)}>
                  <FormLabel color={'gray.500'}>Email:</FormLabel>
                  <Field as={Input} name={'email'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id={'birthDate'} isInvalid={!!(formik.errors.birthDate && formik.touched.birthDate)}>
                  <FormLabel color={'gray.500'}>Date of Birth:</FormLabel>
                  <Field as={Input} name={'birthDate'} border={'none'} focusBorderColor={'transparent'} placeholder={'MM/DD/YYYY'}></Field>
                  <FormErrorMessage>{formik.errors.birthDate}</FormErrorMessage>
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
                  <Field
                    as={Textarea}
                    name={'about'}
                    border={'none'}
                    focusBorderColor={'transparent'}
                    resize={'none'}
                    placeholder="Tell us about yourself..."/>
                  <FormErrorMessage>{formik.errors.about}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color={'gray.500'}>Interests:</FormLabel>
                  <TagInput tags={tags} setTags={setTags} />
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
