import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import NotebookModel from '../../../../models/NotebookModel';
import DirectoryModel from '../../../../models/DirectoryModel';
import config from '../../../../config';


const MoveDialog = ({ 
  notebook,
  moveDialogOpen,
  setMoveDialogOpen,
 }) => {

  const jupyterBaseUrl= `${config.jupyterBaseUrl}`
  const baseUrl = `${jupyterBaseUrl}/api/contents`
  const directoryUrl = `${baseUrl}/work`

  const [directories, setDirectories] = useState([]);
  const [destinationDirectory, setDestinationDirectory] = useState('work');

  useEffect(() => {
    const fetchDirectories = async () => {
      const items = await DirectoryModel.getAllItems(directoryUrl);
      setDirectories(items);
    };

    fetchDirectories();
  }, []);

  const renderTree = (node) => (
    <TreeItem 
      onClick={(event) => {
        setDestinationDirectory(node.path)
      }}
      itemId={node.path} 
      label={node.name} 
      key={node.id}
      disabled={node.type !== 'directory'}>
      {
        node.type === 'directory' ? 
        node.children.map((child) => renderTree(child))
          : null
      }
    </TreeItem>
  );



  return (
    <Dialog
      open={moveDialogOpen}
      sx={{
        '.MuiPaper-root': { 
          backgroundColor: '#222',
          color: 'lightgrey',
          width: '700px',
          height: '500px',
        }
      }}>
      <DialogTitle>
        Please choose the destination folder
      </DialogTitle>
      <DialogContent>
        <SimpleTreeView
          aria-label="file system navigator"
          sx={{ height: '500px', flexGrow: 1, maxWidth: '700px', overflowY: 'auto' }}
        >
          {directories.map((directory) => (
            renderTree(directory)
          ))}
        </SimpleTreeView>
      </DialogContent>
      <DialogActions>
        <Button 
          style={{ color: 'lightgrey' }}
          onClick={() => {
            setMoveDialogOpen(false)}}>
          Cancel
        </Button>
        <Button 
          style={{ color: 'lightgrey' }}
          onClick={() => {
            NotebookModel.moveNotebook(baseUrl, notebook.path, destinationDirectory + '/' + notebook.name);
            setMoveDialogOpen(false);
          }}>
          Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MoveDialog;