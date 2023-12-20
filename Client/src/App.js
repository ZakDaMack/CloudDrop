import './App.css';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Home from './Pages/Home';
import { AuthContext } from './AuthContext'
import { CardAction, Snackbar } from './Components/CustomSnackbar'
import { SnackbarProvider } from 'notistack';

function App() {
  const defaultTheme = createTheme();
  const [auth, setAuth] = useState({
    loading: true,
    error: null,
    authEnabled: false,
    user: null
  });

  // check auth status on component mount
  useEffect(() => {
    fetch('/api/file')
    .then((res) => res.json())
    .then((data) => setAuth({
      ...auth, authEnabled: data.authEnabled, loading: false
    }))
    .catch((err) => setAuth({
      ...auth,
      error: "There was an error reaching the server", 
      loading: false
    }))
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'right', vertical: 'top'}} Components={{ default: Snackbar }}>
        <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            {/* <p>{JSON.stringify(auth)}</p> */}
            <Home />
          </Container>
        </AuthContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;