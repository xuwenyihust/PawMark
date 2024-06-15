import { Button, Dialog, DialogActions, TextField, DialogContent, DialogTitle } from '@mui/material';


const CreateNotebookDialog = ({
    createNotebookDialogOpen,
    setCreateNotebookDialogOpen,
    notebookName,
    setNotebookName,
    handleCreateClose,
    handleCreateNotebook
  }) => {

  return (
    <Dialog 
      open={createNotebookDialogOpen} 
      sx={{
        '.MuiPaper-root': { 
          backgroundColor: '#222',
          color: 'lightgrey',
          width: '300px'
        }
      }}
      >
      <DialogTitle>Create Notebook</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Notebook Name"
          type="text"
          fullWidth
          value={notebookName}
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
          onChange={(e) => setNotebookName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: 'lightgrey' }} 
          onClick={() => {
          setCreateNotebookDialogOpen(false);
          handleCreateClose();}}>Cancel</Button>
        <Button 
          style={{ color: 'lightgrey' }} 
          onClick={() => {
          handleCreateNotebook();
          }}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNotebookDialog;