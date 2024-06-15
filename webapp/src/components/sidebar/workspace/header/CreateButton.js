import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgChevronDown } from "react-icons/cg";
import CreateNotebookDialog from './CreateNotebookDialog';
import CreateFolderDialog from './CreateFolderDialog';


const CreateButton = ({ 
  setRefreshKey,
  anchorEl,
  handleCreateClick,
  handleCreateClose,
  createNotebookDialogOpen,
  setCreateNotebookDialogOpen,
  notebookName,
  setNotebookName,
  handleCreateNotebook,
  createFolderDialogOpen,
  setCreateFolderDialogOpen,
  folderName,
  setFolderName,
  handleCreateFolder,
 }) => {
  return (
    <div>
      <Button
        endIcon={<CgChevronDown />}
        onClick={handleCreateClick}
        style={{ 
          fontFamily: 'Roboto',
          color: 'lightgrey', 
          marginRight: '20px',
          marginTop: '18px',
          border: '1px solid grey',
          width: '100px',
          height: '30px'
          }}>Create
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCreateClose}
        PaperProps={{
          elevation: 0,
          style: { 
            width: '100px',
            backgroundColor: '#222',
            borderBottom: '1px solid grey',
            borderLeft: '1px solid grey',
            borderRight: '1px solid grey',
          },
        }}>

        {/* Create Folder */}
        <MenuItem 
          onClick={() => {
            setCreateFolderDialogOpen(true);
            setRefreshKey(oldKey => oldKey + 1);
          }}
          style={{ color: 'lightgrey' }}>Folder</MenuItem>
        
        <CreateFolderDialog 
          createFolderDialogOpen={createFolderDialogOpen}
          setCreateFolderDialogOpen={setCreateFolderDialogOpen}
          folderName={folderName}
          setFolderName={setFolderName}
          handleCreateClose={handleCreateClose}
          handleCreateFolder={handleCreateFolder}
        />

        {/* Create Notebook */}
        <MenuItem 
          onClick={() => {
            setCreateNotebookDialogOpen(true);
            setRefreshKey(oldKey => oldKey + 1);
          }}
          style={{ color: 'lightgrey' }}>Notebook</MenuItem>

        <CreateNotebookDialog 
          createNotebookDialogOpen={createNotebookDialogOpen}
          setCreateNotebookDialogOpen={setCreateNotebookDialogOpen}
          notebookName={notebookName}
          setNotebookName={setNotebookName}
          handleCreateClose={handleCreateClose}
          handleCreateNotebook={handleCreateNotebook}
        />
      </Menu>
    </div>
  );
}

export default CreateButton;