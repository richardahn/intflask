// -- General --
import React from 'react';

// -- Components --
import Header from './Header';
import Footer from './Footer';

// -- Actions --
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core';

// -- Material UI --
import { createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack'; // Toasts

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#fff', // Warning: Notistack snackbar doesn't support 'white', so use '#fff'
      default: '#fff',
    },
  },
});

/** Renders the general page layout and general styles/themes */
export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Box className="App">
          <Box style={{ minHeight: '100vh' }}>
            <Header />
            {children}
          </Box>
          <Footer />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
