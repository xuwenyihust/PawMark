import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Notebook from './components/notebook/Notebook';
import HistoryServer from './components/HistoryServer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from './config';
import NotebookModel from './models/NotebookModel';
import DirectoryModel from './models/DirectoryModel';

const theme = createTheme({
  components: {
      MuiDrawer: {
          styleOverrides: {
              paper: {
                  backgroundColor: '#222', // Dark background color
                  color: '#fff', // White text color
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
  const [isNotebookModified, setIsNotebookModified] = useState(false);

  const [openWorkspaceDrawer, setOpenWorkspaceDrawer] = useState(false);
  const [currentPath, setCurrentPath] = useState('work');
  const [workspaceFiles, setWorkspaceFiles] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Workspace
  useEffect(() => {
    if (openWorkspaceDrawer) {
        DirectoryModel.getFiles(baseUrl + currentPath) // Fetch files from the root or specify a path
            .then(setWorkspaceFiles)
            .catch(error => console.error('Failed to fetch files:', error));
        console.log('Fetched workspace files:', workspaceFiles);
    }
  }, [openWorkspaceDrawer, currentPath, notebookState, refreshKey]);

  const handleDirectoryClick = (path) => {
    setCurrentPath(path);  // Update the path to fetch and display new contents
  };

  // Notebook
  const handleUnsavedChanges = () => {
    if (isNotebookModified) {
      const confirmSwitch = window.confirm('You have unsaved changes. Are you sure you want to switch notebooks?');
      if (confirmSwitch) {
        setIsNotebookModified(false);
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  const handleNewNotebookClick = () => {
    if (handleUnsavedChanges()) {
      NotebookModel.createNotebook(`${baseUrl}work`).then((data) => {
        const notebookPath = `${baseUrl}${data.path}`
        NotebookModel.fetchNotebook(notebookPath).then((data) => {
          setNotebook(data);
          setShowHistoryServer(false);
          setShowNotebook(true);
        }).catch((error) => {
          console.error('Failed to fetch newly created notebook:', error);
        });
        
      }).catch((error) => {
        console.error('Failed to create notebook:', error);
      });
    }
  };  

  const handleExistingNotebookClick = (path) => {
    if (handleUnsavedChanges()) {
      NotebookModel.fetchNotebook(`${baseUrl}${path}`).then((data) => {
        console.log('Fetched notebook:', data);
        setNotebook(data);
        setShowHistoryServer(false);
        setShowNotebook(true);
      }).catch((error) => {
        console.error('Failed to fetch notebook:', error);
      });
    }
  }

  const handleDeleteNotebook = () => {
    if (window.confirm('Are you sure you want to delete this notebook?')) {
      NotebookModel.deleteNotebook(baseUrl + notebook.path).then((data) => {
        setNotebookState({}); // Clear notebook content
        console.log('Notebook deleted:', notebookState);
    }).catch((error) => {
        console.error('Failed to delete notebook:', error);
    });
  }}

  // History server
  const handleHistoryServerClick = () => {
    if (handleUnsavedChanges()) {
      setShowNotebook(false);
      setShowHistoryServer(true);
    }
  };

  return (
      <ThemeProvider theme={theme}>
        <Sidebar 
          onNewNotebookClick={handleNewNotebookClick} 
          onExistinNotebookClick={handleExistingNotebookClick}
          onHistoryServerClick={handleHistoryServerClick} 
          handleDirectoryClick={handleDirectoryClick}
          openWorkspaceDrawer={openWorkspaceDrawer}
          setOpenWorkspaceDrawer={setOpenWorkspaceDrawer}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
          workspaceFiles={workspaceFiles}
          createDirectory={(directoryPath) => DirectoryModel.createDirectory(baseUrl, directoryPath)}/>
        <Notebook 
          showNotebook={showNotebook}
          notebook={notebook}
          notebookState={notebookState}
          setNotebookState={setNotebookState}
          isNotebookModified={isNotebookModified}
          setIsNotebookModified={setIsNotebookModified}
          handleDeleteNotebook={handleDeleteNotebook} />
        <HistoryServer showHistoryServer={showHistoryServer} />
      </ThemeProvider>
  );
};

export default App;
