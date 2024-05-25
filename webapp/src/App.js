import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Notebook from './components/Notebook';
import HistoryServer from './components/HistoryServer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createNotebook, fetchNotebook } from './api';
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
      MuiAppBar: {
        styleOverrides: {
          root: {
            position: 'sticky',
            top: 0,
          },
        },
      },
  },
});

const App = () => {
  const [showNotebook, setShowNotebook] = useState(false);
  const [showHistoryServer, setShowHistoryServer] = useState(false);

  const [notebookSrc, setNotbookSrc] = useState('');
  const [notebook, setNotebook] = useState({});

  const handleNewNotebookClick = () => {
    createNotebook(`${config.jupyterBaseUrl}/api/contents/work`).then((data) => {
      const notebookPath = `${config.jupyterBaseUrl}/api/contents/${data.path}`
      fetchNotebook(notebookPath).then((data) => {
        console.log('Fetched newly created notebook:', data);
        setNotebook(data);
        setShowHistoryServer(false);
        setShowNotebook(true);
      }).catch((error) => {
        console.error('Failed to fetch newly created notebook:', error);
      });
      
    }).catch((error) => {
      console.error('Failed to create notebook:', error);
    });
  };  

  const handleExistingNotebookClick = (path) => {
    fetchNotebook(`${config.jupyterBaseUrl}/api/contents/${path}`).then((data) => {
      console.log('Fetched notebook:', data);
      setNotebook(data);

      setNotbookSrc(`${config.jupyterBaseUrl}/tree/${path}`);
      setShowHistoryServer(false);
      setShowNotebook(true);
    }).catch((error) => {
      console.error('Failed to fetch notebook:', error);
    });
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
        <Notebook showNotebook={showNotebook} notebookSrc={notebookSrc} notebook={notebook} />
        <HistoryServer showHistoryServer={showHistoryServer} />
      </ThemeProvider>
  );
};

export default App;
