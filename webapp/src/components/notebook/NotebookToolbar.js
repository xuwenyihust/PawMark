import React from 'react';
import { MdOutlineSave, MdDeleteOutline } from "react-icons/md";
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';

function NotebookToolbar({notebook, saveNotebook, deleteNotebook}) {
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
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {notebook.name}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 0 }}>
                          <IconButton onClick={saveNotebook} aria-label="save" 
                              sx={{ 
                                  width: 'auto', 
                                  mt: 0.5 }}>
                              <MdOutlineSave size={18} style={{ color: 'grey' }}/>
                          </IconButton>
                          <IconButton onClick={deleteNotebook} aria-label="delete" 
                              sx={{ 
                                  width: 'auto', 
                                  mt: 0.5 }}>
                              <MdDeleteOutline size={18} style={{ color: 'grey' }}/>
                          </IconButton>
                      </Box>
                  </Box>
              </Toolbar>
          </AppBar>
      </Box>
    );
}

export default NotebookToolbar;