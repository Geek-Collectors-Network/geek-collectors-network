import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme/theme';

const container = document.getElementById('__react_app__');
const root = createRoot(container!);
root.render(<React.StrictMode>
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
</React.StrictMode>);

