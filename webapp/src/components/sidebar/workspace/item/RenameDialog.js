import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import NotebookModel from '../../../../models/NotebookModel';

const RenameDialog = ({
  baseUrl, 
  file, 
  renameDialogOpen, 
  setRenameDialogOpen,
  handleMoreClose, 
  handleRename
}) => {

  const [newName, setNewName] = useState(file.name);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <Dialog
      open={renameDialogOpen}
      sx={{
        '.MuiPaper-root': { 
          backgroundColor: '#222',
          color: 'lightgrey',
        }
      }}>
      <DialogTitle>
        Rename
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            color: 'lightgrey'
          }}>
          Please enter the new name for: {NotebookModel.getNameWithoutExtension(file.name)}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="New Name"
          type="text"
          fullWidth
          value={newName}
          onChange={handleInputChange}
          sx={{ 
            '.MuiInputBase-root': { color: 'lightgrey' },
            '.MuiFormLabel-root': { color: 'grey' },
            '.MuiInputLabel-root': { color: 'grey' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#eee' },
              '&:hover fieldset': { borderColor: '#ddd' },
              '&.Mui-focused fieldset': { borderColor: '#ddd' },
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: 'lightgrey', // Change this to your desired color
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          style={{ color: 'lightgrey' }}
          onClick={() => {
            setRenameDialogOpen(false)}}>
          Cancel
        </Button>
        <Button 
          style={{ color: 'lightgrey' }}
          onClick={(event) => {
            setRenameDialogOpen(false);
            handleMoreClose();
            file.type === 'directory' ? 
              handleRename(file, newName) : 
              handleRename(file, NotebookModel.getNameWithExtension(newName));
          }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameDialog;