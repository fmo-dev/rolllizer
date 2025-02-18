import { createTheme } from "@mui/material";

// --color-main: #056842;
// --color-white: #f9f6c9;
// --color-background: #fffbbd;
// --color-danger: #ca3c25;
// --color-success: #7fb069;
// --color-warning: #e6aa68;
// --color-text: #29302d;
const palette = {
  main: '#056842',
  secondary: '#fffbbd',
  error: '#ca3c25',
  success: '#7fb069',
  warning: '#e6aa68',
  text: '#29302d',
}


export const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", serif'
  },
  palette: {
    primary: {
      main: palette.main,
    },
    secondary: {
      main: palette.secondary,
    },
    error: {
      main: palette.error,
    },
    success: {
      main: palette.success,
    },
    warning: {
      main: palette.warning,
    },
    text: {
      primary: palette.text,
    },
  }
});