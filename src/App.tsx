import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainNav from './main-nav';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: orange[500]
      },
      secondary: {
        main: blue[500]
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <MainNav></MainNav>
    </ThemeProvider>
  );
}

export default App;
