import React from 'react';
import { MdOutlineSave, MdDeleteOutline } from "react-icons/md";
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';

function NotebookToolbar({notebook, 
  isNameEditing,
  currentName,
  isNotebookModified, 
  handleClickNotebookName,
  handleChangeNotebookName,
  handleSaveNotebookName,
  saveNotebook, 
  deleteNotebook}) {
    return (
      <Box sx={{ 
        marginLeft: 0,
        marginBottom: 5 }}> 
          <AppBar 
            position="static" 
            color="default" 
            elevation={0}
            sx={{ 
              backgroundColor: '#fff',
              borderBottom: '0.2px solid grey'
              }}>
              <Toolbar>
                  <Box sx={{ 
                          flexDirection: 'column', 
                          alignItems: 'start',
                          mt: 2 }}>
                      {isNameEditing ? (
                          <input 
                              type="text"
                              value={currentName}
                              onChange={handleChangeNotebookName}
                              onBlur={handleSaveNotebookName}
                              autoFocus
                              style={{ 
                                  border: 'none',
                                  fontSize: '20px',
                                  fontWeight: 'bold',
                                  backgroundColor: 'transparent',
                                  color: 'black' }}/>
                        ) : (
                          <Typography variant="h6" 
                            sx={{ fontWeight: 'bold' }}
                            onClick={handleClickNotebookName}>
                            {currentName} 
                            {isNotebookModified && 
                              <span style={{ 
                                  fontSize: '14px',
                                  color: 'grey',
                                  marginLeft: '10px' }}>(Unsaved Changes)</span>}
                          </Typography>
                        )
                      }
                      <Box sx={{ display: 'flex', mt: 0 }}>
                          <IconButton 
                            disableRipple
                            onClick={saveNotebook} aria-label="save" 
                              sx={{ 
                                  width: 'auto', 
                                  mt: 0.5 }}>
                              <MdOutlineSave 
                                size={18} 
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'black';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'grey';
                                }}
                                style={{ color: 'grey' }}/>
                          </IconButton>
                          <IconButton 
                            disableRipple 
                            onClick={deleteNotebook} aria-label="delete" 
                              sx={{ 
                                  width: 'auto', 
                                  mt: 0.5 }}>
                              <MdDeleteOutline 
                                size={18} 
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'black';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'grey';
                                }}
                                style={{ color: 'grey' }}/>
                          </IconButton>
                      </Box>
                  </Box>
              </Toolbar>
          </AppBar>
      </Box>
    );
}

export default NotebookToolbar;