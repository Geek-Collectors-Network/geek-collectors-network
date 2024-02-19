import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import App from './App';
import theme from './theme/theme';

const store = createStore({
  authType: 'cookie',
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: false, // set to true if served over HTTPS
});

const container = document.getElementById('__react_app__');
const root = createRoot(container!);
root.render(<React.StrictMode>
  <ChakraProvider theme={theme}>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ChakraProvider>
</React.StrictMode>);
