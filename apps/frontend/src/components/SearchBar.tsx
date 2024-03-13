import React from 'react';
import { Input } from '@chakra-ui/react';

type SearchBarProps = {

    /* `onSearch` is a function that takes a string as an argument and
    returns nothing. This function will be used to filter the data
    displayed in the table. */
    onSearch: (search: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      placeholder="Search..."

      /* `onChange` listens for any changes inside Input, i.e., if the
      user typed or deleted values; each time there's a change, this
      function fires, which in turn will call the `onSearch` function.
      `e`, the event, returns lots of info; `target` refers to the
      HTML element, `Input`, and `target` specifically refers to the
      characters in the input box; it's these that'll be used for search. */
      onChange={e => onSearch(e.target.value)}/>
  );
}

export default SearchBar;
