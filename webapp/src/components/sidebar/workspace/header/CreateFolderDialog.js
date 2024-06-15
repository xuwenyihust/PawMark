import { Button, Dialog, DialogActions, TextField, DialogContent, DialogTitle } from '@mui/material';


const CreateFolderDialog = ({
    createFolderDialogOpen,
    setCreateFolderDialogOpen,
    folderName,
    setFolderName,
    handleCreateClose,
    handleCreateFolder
  }) => {

  return (
    <Dialog 
      open={createFolderDialogOpen} 
      sx={{
        '.MuiPaper-root': { 
          backgroundColor: '#222',
          color: 'lightgrey',
          width: '300px'
        }
      }}
      >
      <DialogTitle>Create Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          value={folderName}
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
          onChange={(e) => setFolderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: 'lightgrey' }} 
          onClick={() => {
          setCreateFolderDialogOpen(false);
          handleCreateClose();}}>Cancel</Button>
        <Button 
          style={{ color: 'lightgrey' }} 
          onClick={() => {
          handleCreateFolder();
          }}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFolderDialog;