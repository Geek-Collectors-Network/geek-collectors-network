import React from 'react';
import { Input } from '@chakra-ui/react';

type SearchBarProps = {

    /* This function will filter data to be displayed in parent component.
    Ex. Displaying names containing the characters typed in by the user.  */
    onSearch: (search: string) => void;
    placeholderText?: string;
}

function SearchBar({ onSearch, placeholderText = 'Search...' }: SearchBarProps) {
  return (
    <Input
      placeholder={placeholderText}
      onChange={e => onSearch(e.target.value)}/>
  );
}

export default SearchBar;
