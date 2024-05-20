import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Notebook from './components/Notebook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createNotebook } from './api';

const theme = createTheme({
  components: {
      MuiDrawer: {
          styleOverrides: {
              paper: {
                  backgroundColor: '#333', // Dark grey
                  color: '#fff', // White text color
                  paddingLeft: '20px',
                  width: '200px',
                  justifyContent: 'left',
              },
          },
      },
  },
});

const jupyterBaseUrl = process.env.REACT_APP_JUPYTER_BASE_URL;

const App = () => {
  const [showNotebook, setShowNotebook] = useState(false);
  const [notebookSrc, setNotbookSrc] = useState('');

  const handleNewNotebookClick = () => {
    createNotebook(`${jupyterBaseUrl}/api/contents/work`).then((data) => {
      setNotbookSrc(`${jupyterBaseUrl}/tree/${data.path}`);
      setShowNotebook(true);
    }).catch((error) => {
      console.error('Failed to create notebook:', error);
    });
  };  

  const handleExistingNotebookClick = (path) => {
    setNotbookSrc(`${jupyterBaseUrl}/tree/${path}`);
    setShowNotebook(true);
  }

  return (
      <ThemeProvider theme={theme}>
        <Sidebar jupyterBaseUrl={jupyterBaseUrl} onNewNotebookClick={handleNewNotebookClick} onExistinNotebookClick={handleExistingNotebookClick} />
        <Notebook showNotebook={showNotebook} notebookSrc={notebookSrc} />
      </ThemeProvider>
  );
};

export default App;
