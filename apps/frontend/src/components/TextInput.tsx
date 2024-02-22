import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

type TextInputProps = {
    name: string,
    label: string,
    type?: string
  }

function TextInput({ name, label, type = 'text' }: TextInputProps) {
  /* `name` is an array of information: `field` contains properties that
  are "spread across" the input. `meta` contains metadata about the input
  including error message defined in the schema. The equivalent would be
  using useFormik() and manually spreading properties across the input:

  const formik = useFormik()...
  <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstName}
       />
  */
  const [field, meta] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} type={type} focusBorderColor="brand.600" />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default TextInput;
