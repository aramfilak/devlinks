import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

const theme = extendTheme({
  colors: {
    devlinks: {
      '--ac-cl-1': '#633cff',
      '--ac-cl-2': '#beadff',
      '--c-cl-3': '#efebff',

      '--font-dark': '#333333',
      '--font-normal': '#737373',
      '--font-light': ' #fff',

      '--err-cl': '#d00000',
      '--bg-cl': '#eee',
      '--bg-cl-light': '#fafafa',
      '--comp-cl': ' #fff',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
