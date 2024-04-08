import { extendTheme } from '@chakra-ui/react';
import '@fontsource/noto-sans';

export const theme = extendTheme({
  colors: {
    brand: {
      '50': '#fff6ec',
      '100': '#ffdfc2',
      '200': '#ffc598',
      '300': '#ffad6d',
      '400': '#ff953f',
      '500': '#FF802A',
      '600': '#ff741e',
      '700': '#ff6713',
      '800': '#ff5a07',
      '900': '#ff4c00',
    },
    background: {
      '50': '#f2f4f6',
      '100': '#d6dde3',
      '200': '#bac3cc',
      '300': '#9eabb6',
      '400': '#8293a0',
      '500': '#112B45',
      '600': '#0e2337',
      '700': '#0b1a29',
      '800': '#08121b',
      '900': '#050a0d',
    },
    text: '#261605',
    grey: '#86807A',
  },
  fonts: {
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  styles: {
    global: {
      '*': {
        'fontFamily': 'Noto Sans, sans-serif',
        'fontWeight': 'light',
        'margin': 0,
        'padding': 0,
        'boxSizing': 'border-box',

        'listStyle': 'none',
        'textDecoration': 'none',
      },
      'body': {
        'height': '100vh',
        'width': '100vw',
      },
      'button': {
        'fontWeight': 'light',
      },
      'form': {
        'background': 'background.500',
        'width': '80%',
        'maxWidth': '30rem',
        'label': {
          'color': 'white',
          'fontSize': '1.2rem',
        },
        'input': {
          'background': 'white',
          'padding': '1.7rem',
          'margin': '0.5rem 0',
        },
        'button': {
          'fontWeight': 'light',
          'padding': '1.7rem',
          'margin': '1.5rem 0 0',
          'width': '100%',
        },
        'a': {
          'color': 'grey',
          'fontSize': '1rem',
          '_hover': {
            'color': 'brand.100',
          },
        },
      },
      '.background': {
        'backgroundColor': 'background.500',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'justifyContent': 'center',
        'height': '100vh',
        'width': '100vw',
      },
      '.motto': {
        'color': 'white',
        'fontSize': '1.5rem',
        'margin': '3.5rem 0 0',
      },
      '.navigation-buttons': {
        'gap': '0.2rem',
        'margin': '7rem 0 0',
        'width': '100%',
        'maxWidth': '40rem',
        '.navigation-button': {
          'borderRadius': '0',
          'fontWeight': 'light',
          'padding': '2.5rem',
          'width': '100%',
          '&.signup': {
            'backgroundColor': 'brand.500',
            'color': 'white',
            '&:hover': {
              'opacity': '0.8',
            },
          },
          '&.login': {
            'color': 'background.500',
            '&:hover': {
              'opacity': '0.8',
            },
          },
        },
      },
    },
  },
  components: {},
});

export default theme;
