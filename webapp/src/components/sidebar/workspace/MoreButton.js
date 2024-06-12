import { useState } from 'react';
import { CgMoreVerticalAlt } from "react-icons/cg";
import { Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import config from '../../../config';
import { deleteItem } from '../../../api';

const MoreButton = ({
  file,
  refreshKey,
  setRefreshKey
 }) => {
  const baseUrl = `${config.jupyterBaseUrl}/api/contents/`

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMoreClicked = (event, file) => {
    console.log('More clicked:', file);
    setAnchorEl(event.currentTarget);
  }

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

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
        <MenuItem 
          sx={{ color: 'lightgrey' }}
          onClick={() => {
            setDeleteDialogOpen(true);
          }}>
            Delete
        </MenuItem>
        <Dialog
          open={deleteDialogOpen}>
          <DialogTitle>
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {file.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setDeleteDialogOpen(false)}}>
              Cancel
            </Button>
            <Button onClick={() => {
              setDeleteDialogOpen(false);
              handleMoreClose();
              console.log('Delete:', file);
              // Add your delete logic here
              deleteItem(baseUrl, file);
              setRefreshKey(oldKey => oldKey + 1);
            }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <MenuItem 
          sx={{ color: 'lightgrey' }}
          onClick={() => {}}>
            Rename</MenuItem>
      </Menu>
    </div> 
  );
}

export default MoreButton;