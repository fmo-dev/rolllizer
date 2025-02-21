import React from 'react'

import { AuthenticationProvider } from './providers/authentication/provider';
import { APIProvider } from './providers/api/provider';

import { Router } from './providers/router';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <APIProvider>
          <AuthenticationProvider>
            <Router />
          </AuthenticationProvider>
        </APIProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
