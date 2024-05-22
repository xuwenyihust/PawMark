import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Notebook from './components/Notebook';
import HistoryServer from './components/HistoryServer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createNotebook } from './api';
import config from './config';


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

// const jupyterBaseUrl = process.env.REACT_APP_JUPYTER_BASE_URL;

const App = () => {
  const [showNotebook, setShowNotebook] = useState(false);
  const [showHistoryServer, setShowHistoryServer] = useState(false);

  const [notebookSrc, setNotbookSrc] = useState('');

  const handleNewNotebookClick = () => {
    createNotebook(`${config.jupyterBaseUrl}/api/contents/work`).then((data) => {
      setNotbookSrc(`${config.jupyterBaseUrl}/tree/${data.path}`);
      setShowHistoryServer(false);
      setShowNotebook(true);
    }).catch((error) => {
      console.error('Failed to create notebook:', error);
    });
  };  

  const handleExistingNotebookClick = (path) => {
    setNotbookSrc(`${config.jupyterBaseUrl}/tree/${path}`);
    setShowHistoryServer(false);
    setShowNotebook(true);
  }

  const handleHistoryServerClick = () => {
    setShowNotebook(false);
    setShowHistoryServer(true);
  };

  return (
      <ThemeProvider theme={theme}>
        <Sidebar 
          jupyterBaseUrl={config.jupyterBaseUrl} 
          onNewNotebookClick={handleNewNotebookClick} 
          onExistinNotebookClick={handleExistingNotebookClick}
          onHistoryServerClick={handleHistoryServerClick} />
        <Notebook showNotebook={showNotebook} notebookSrc={notebookSrc} />
        <HistoryServer showHistoryServer={showHistoryServer} />
      </ThemeProvider>
  );
};

export default App;
