import React from 'react'

import { AuthenticationProvider } from './providers/authentication/provider';
import { APIProvider } from './providers/api/provider';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { RouterContextProvider } from './providers/router/provider';
import { GroupContextProvider } from './providers/groups/provider';
import { Router } from './providers/router';
import { ToastContextProvider } from './providers/toast/provider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { frFR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/fr';
function App() {

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        adapterLocale="fr"
        localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}
        dateAdapter={AdapterDayjs}
      >
        <ToastContextProvider>
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
        </ToastContextProvider>
      </LocalizationProvider>
    </ThemeProvider >
  )
}

export default App
