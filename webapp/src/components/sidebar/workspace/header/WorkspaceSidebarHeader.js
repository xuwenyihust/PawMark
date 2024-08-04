import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import config from '../../../../config';
import CreateButton from './CreateButton';
import DirectoryModel from '../../../../models/DirectoryModel';
import NotebookModel from '../../../../models/NotebookModel';


const WorkspaceSidebarHeader = ({
  rootPath,
  currentPath,
  setCurrentPath,
  setRefreshKey,
  workspaceFiles
}) => {
  const baseUrl = `${config.jupyterBaseUrl}/api/contents/`

  const [anchorEl, setAnchorEl] = useState(null);

  const [createNotebookDialogOpen, setCreateNotebookDialogOpen] = useState(false);
  const [notebookName, setNotebookName] = useState('');

  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleCreateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateClose = () => {
    setAnchorEl(null);
  };

  const handleCreateFolder = () => {
    const directoryModel = new DirectoryModel(currentPath, workspaceFiles);
    if (directoryModel.isUniqueFolderName(folderName)) {
      console.log('Creating folder:', folderName);
      DirectoryModel.createDirectory(`${currentPath}`, folderName);
      setCreateFolderDialogOpen(false);
      handleCreateClose();
      setRefreshKey(oldKey => oldKey + 1);
    } else {
      console.error('Folder name already exists:', folderName);
      alert('Folder name already exists. Please choose a different name.');
    }
  };

  const handleCreateNotebook = () => {
    const directoryModel = new DirectoryModel(currentPath, workspaceFiles);
    if (directoryModel.isUniqueNotebookName(notebookName)) {
      console.log('Creating notebook:', notebookName);
      NotebookModel.createNotebook(`${currentPath}`, notebookName);
      setCreateNotebookDialogOpen(false);
      handleCreateClose();
      setRefreshKey(oldKey => oldKey + 1);
    } else {
      console.error('Notebook name already exists:', notebookName);
      alert('Notebook name already exists. Please choose a different name.');
    }
  }

  return (
    <div>
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
          setRefreshKey={setRefreshKey}
          anchorEl={anchorEl}
          handleCreateClick={handleCreateClick}
          handleCreateClose={handleCreateClose}
          createNotebookDialogOpen={createNotebookDialogOpen}
          setCreateNotebookDialogOpen={setCreateNotebookDialogOpen}
          notebookName={notebookName}
          setNotebookName={setNotebookName}
          handleCreateNotebook={handleCreateNotebook}
          createFolderDialogOpen={createFolderDialogOpen}
          setCreateFolderDialogOpen={setCreateFolderDialogOpen}
          folderName={folderName}
          setFolderName={setFolderName}
          handleCreateFolder={handleCreateFolder}/>
      </Box>

      <Box sx={{ 
        color: 'grey',
        marginLeft: '20px', 
        marginTop: '0px', 
        marginBottom: '10px' }}>
        <Typography variant="body1">
          {currentPath.replace(rootPath, '') === '' ? '/' : currentPath.replace(rootPath, '')}
        </Typography>
      </Box>
  </div>
  );
}

export default WorkspaceSidebarHeader;