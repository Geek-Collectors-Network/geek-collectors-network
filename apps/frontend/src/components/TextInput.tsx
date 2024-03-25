import React, { useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

type TextInputProps = {
  name: string,
  label: string,
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function TextInput({ name, label, onChange = () => { }, type = 'text' }: TextInputProps) {
  const [value, setValue] = useState(''); // onChange will break text input, we will set it explicitly here
  const [field, meta] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} type={type} value={value} onChange={e => { onChange(e); setValue(e.target.value); }} focusBorderColor="brand.600" />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default TextInput;
