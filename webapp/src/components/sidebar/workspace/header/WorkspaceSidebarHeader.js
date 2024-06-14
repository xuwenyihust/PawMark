import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import config from '../../../../config';
import CreateButton from './CreateButton';
import DirectoryModel from '../../../../models/DirectoryModel';
import NotebookModel from '../../../../models/NotebookModel';


const WorkspaceSidebarHeader = ({
  currentPath,
  setCurrentPath,
  refreshKey,
  setRefreshKey,
  createDirectory,
  workspaceFiles
}) => {
  const baseUrl = `${config.jupyterBaseUrl}/api/contents/`

  const [anchorEl, setAnchorEl] = useState(null);
  const [createNotebookDialogOpen, setCreateNotebookDialogOpen] = useState(false);
  const [notebookName, setNotebookName] = useState('');

  const handleCreateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNotebook = () => {
    console.log('Already have notebooks:', workspaceFiles);
    const directoryModel = new DirectoryModel(currentPath, workspaceFiles);
    if (directoryModel.isUniqueNotebookName(notebookName)) {
      console.log('Creating notebook:', notebookName);
      NotebookModel.createNotebook(`${baseUrl}${currentPath}`, notebookName);
      setCreateNotebookDialogOpen(false);
      handleCreateClose();
      setRefreshKey(oldKey => oldKey + 1);
    } else {
      console.error('Notebook name already exists:', notebookName);
      alert('Notebook name already exists. Please choose a different name.');
    }
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Roboto',
            fontSize: '15px',
            color: 'lightgrey',
            fontWeight: 'bold',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px'
          }}>
          Workspace
        </Typography>

        <CreateButton
          createDirectory={createDirectory}
          currentPath={currentPath}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
          anchorEl={anchorEl}
          handleCreateClick={handleCreateClick}
          handleCreateClose={handleCreateClose}
          createNotebookDialogOpen={createNotebookDialogOpen}
          setCreateNotebookDialogOpen={setCreateNotebookDialogOpen}
          notebookName={notebookName}
          setNotebookName={setNotebookName}
          handleCreateNotebook={handleCreateNotebook}/>
        
      </Box>
  );
}

export default WorkspaceSidebarHeader;