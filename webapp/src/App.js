import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Notebook from './components/notebook/Notebook';
import HistoryServer from './components/HistoryServer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createNotebook, deleteNotebook, fetchNotebook, fetchFiles } from './api/notebooks';
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
  const [showHistoryServer, setShowHistoryServer] = useState(false);

  const baseUrl = `${config.jupyterBaseUrl}/api/contents/`

  const [showNotebook, setShowNotebook] = useState(false);
  const [notebook, setNotebook] = useState({});
  const [notebookState, setNotebookState] = useState({}); 

  const [openWorkspaceDrawer, setOpenWorkspaceDrawer] = useState(false);
  const [currentPath, setCurrentPath] = useState('work');
  const [workspaceFiles, setWorkspaceFiles] = useState([]);

  // Workspace
  useEffect(() => {
    if (openWorkspaceDrawer) {
        fetchFiles(baseUrl + currentPath) // Fetch files from the root or specify a path
            .then(setWorkspaceFiles)
            .catch(error => console.error('Failed to fetch files:', error));
        console.log('Fetched workspace files:', workspaceFiles);
    }
  }, [openWorkspaceDrawer, currentPath, notebookState]);

  const handleDirectoryClick = (path) => {
    setCurrentPath(path);  // Update the path to fetch and display new contents
  };

  // Notebook
  const handleNewNotebookClick = () => {
    createNotebook(`${baseUrl}work`).then((data) => {
      const notebookPath = `${baseUrl}${data.path}`
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
    fetchNotebook(`${baseUrl}${path}`).then((data) => {
      console.log('Fetched notebook:', data);
      setNotebook(data);
      setShowHistoryServer(false);
      setShowNotebook(true);
    }).catch((error) => {
      console.error('Failed to fetch notebook:', error);
    });
  }

  const handleDeleteNotebook = () => {
    if (window.confirm('Are you sure you want to delete this notebook?')) {
      deleteNotebook(baseUrl + notebook.path).then((data) => {
        setNotebookState({}); // Clear notebook content
        console.log('Notebook deleted:', notebookState);
    }).catch((error) => {
        console.error('Failed to delete notebook:', error);
    });
  }}

  // History server
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
          onHistoryServerClick={handleHistoryServerClick} 
          handleDirectoryClick={handleDirectoryClick}
          openWorkspaceDrawer={openWorkspaceDrawer}
          setOpenWorkspaceDrawer={setOpenWorkspaceDrawer}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          workspaceFiles={workspaceFiles}/>
        <Notebook 
          jupyterBaseUrl={config.jupyterBaseUrl}
          showNotebook={showNotebook}
          notebook={notebook}
          notebookState={notebookState}
          setNotebookState={setNotebookState}
          handleDeleteNotebook={handleDeleteNotebook} />
        <HistoryServer showHistoryServer={showHistoryServer} />
      </ThemeProvider>
  );
};

export default App;
