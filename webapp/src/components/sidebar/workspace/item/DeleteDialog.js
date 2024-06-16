import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const DeleteDialog = ({ 
  baseUrl, 
  file, 
  deleteDialogOpen, 
  setDeleteDialogOpen, 
  handleMoreClose, 
  handleDelete
 }) => {

  return (
    <Dialog
      open={deleteDialogOpen}
      sx={{
        '.MuiPaper-root': { 
          backgroundColor: '#222',
          color: 'lightgrey',
        }
      }}>
      <DialogTitle>
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            color: 'lightgrey'
          }}>
          Are you sure you want to delete {file.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          style={{ color: 'lightgrey' }}
          onClick={() => {
            setDeleteDialogOpen(false)}}>
          Cancel
        </Button>
        <Button 
          style={{ color: 'lightgrey' }}
          onClick={() => {
            setDeleteDialogOpen(false);
            handleMoreClose();
            console.log('Delete:', file);
            handleDelete(baseUrl, file);
          }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;