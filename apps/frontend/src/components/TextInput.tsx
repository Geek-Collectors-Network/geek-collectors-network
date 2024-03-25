import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

type TextInputProps = {
  name: string,
  label: string,
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function TextInput({ name, label, type = 'text', ...rest }: TextInputProps) {
  const [field, meta] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} type={type} {...rest} focusBorderColor="brand.600" />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default TextInput;
