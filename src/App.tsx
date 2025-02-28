import React from 'react'

import { AuthenticationProvider } from './providers/authentication/provider';
import { APIProvider } from './providers/api/provider';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { RouterContextProvider } from './providers/router/provider';
import { GroupContextProvider } from './providers/groups/provider';
import { Router } from './providers/router';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouterContextProvider>
          <APIProvider>
            <AuthenticationProvider>
              <GroupContextProvider>
                <Router />
              </GroupContextProvider>
            </AuthenticationProvider>
          </APIProvider>
        </RouterContextProvider>
      </BrowserRouter>
    </ThemeProvider >
  )
}

export default App
