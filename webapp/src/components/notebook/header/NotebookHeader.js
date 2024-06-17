import React from 'react';
import { Box, AppBar, Toolbar } from '@mui/material';
import NotebookTitle from './NotebookTitle';
import NotebookToolbar from './NotebookToolbar';
import NotebookKernel from './NotebookKernel';

function NotebookHeader({
  notebook,
  kernelId,
  isNameEditing,
  currentName,
  isNotebookModified, 
  handleClickNotebookName,
  handleChangeNotebookName,
  handleSaveNotebookName,
  runAllCells,
  saveNotebook, 
  deleteNotebook}) {

    return (
      <Box sx={{ 
        marginLeft: -3,
        marginBottom: 5,
        position: 'sticky',
        top: 0, 
        zIndex: 1, 
        backgroundColor: 'white' 
      }}> 
        <AppBar 
          position="static" 
          color="default" 
          elevation={0}
          sx={{ 
            backgroundColor: '#fff',
            borderBottom: '0.2px solid grey'
            }}>
            <Toolbar>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ mt: 2 }}>
                    <NotebookTitle 
                      isNameEditing={isNameEditing}
                      currentName={currentName}
                      isNotebookModified={isNotebookModified}
                      handleClickNotebookName={handleClickNotebookName}
                      handleChangeNotebookName={handleChangeNotebookName}
                      handleSaveNotebookName={handleSaveNotebookName}
                      />

                    {/* Buttons */}
                    <NotebookToolbar 
                      notebook={notebook}
                      runAllCells={runAllCells}
                      saveNotebook={saveNotebook}
                      deleteNotebook={deleteNotebook}
                      />        
                </Box>
              </Box>

              <NotebookKernel
                kernelId={kernelId}/>

            </Toolbar>
        </AppBar>
      </Box>
    );
}

export default NotebookHeader;