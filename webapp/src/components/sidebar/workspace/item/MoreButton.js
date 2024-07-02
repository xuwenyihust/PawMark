import { useState } from 'react';
import { CgMoreVerticalAlt } from "react-icons/cg";
import { Menu, MenuItem } from '@mui/material';
import config from '../../../../config';
import DirectoryModel from '../../../../models/DirectoryModel';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';

const MoreButton = ({
  file,
  currentPath,
  setRefreshKey
 }) => {
  const baseUrl = `${config.jupyterBaseUrl}/api/contents/`

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const handleMoreClicked = (event, file) => {
    console.log('More clicked:', file);
    setAnchorEl(event.currentTarget);
  }

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (baseUrl, file) => {
    console.log('Delete:', file);
    try {
      await DirectoryModel.deleteItem(baseUrl, file);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
    setRefreshKey(oldKey => oldKey + 1);
  }

  const handleRename = async (file, newName) => {
    try {
      await DirectoryModel.renameItem(currentPath + '/'  + file.name, currentPath + '/' + newName);
    } catch (error) {
      console.error('Failed to rename item:', error);
    }
    setRefreshKey(oldKey => oldKey + 1);
  }

  return (
    <div>
      <CgMoreVerticalAlt 
        onClick={(event) => 
          handleMoreClicked(event, file)}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'lightgrey';
        }}
        style={{
          color: 'lightgrey',
          fontSize: '20px',
          marginTop: '12px',
          marginBottom: 0,
          marginLeft: '10px', 
          marginRight: '10px'
        }}
      />
      <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMoreClose}
          PaperProps={{ style: { backgroundColor: '#222' } }}
        >

        {/* Delete Button */}
        <MenuItem 
          sx={{ color: 'lightgrey' }}
          onClick={() => {
            setDeleteDialogOpen(true);
          }}>
            Delete
        </MenuItem>
        <DeleteDialog
          baseUrl={baseUrl}
          file={file}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleMoreClose={handleMoreClose}
          handleDelete={handleDelete}/>

        {/* Rename Button */}
        <MenuItem 
          sx={{ color: 'lightgrey' }}
          onClick={() => {
            setRenameDialogOpen(true);
          }}>
            Rename
        </MenuItem>
        <RenameDialog 
          baseUrl={baseUrl}
          file={file}
          renameDialogOpen={renameDialogOpen}
          setRenameDialogOpen={setRenameDialogOpen}
          handleMoreClose={handleMoreClose}
          handleRename={handleRename}/>
      </Menu>
    </div> 
  );
}

export default MoreButton;