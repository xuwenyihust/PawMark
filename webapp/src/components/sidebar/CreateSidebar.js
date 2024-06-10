import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgAdd, CgNotes, CgEye, CgCalendarToday, CgAlbum } from "react-icons/cg";

function CreateSidebar({ openCreateDrawer, 
    closeCreateDrawer,
    handleToggleCreateDrawer, 
    createButtonRef, 
    onNewNotebookClick }) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openCreateDrawer}
      onClose={handleToggleCreateDrawer}
      sx={{ 
        width: 470, 
        zIndex: 1,
        flexShrink: 0,
        height: 'auto',
        top: createButtonRef.current.offsetTop + createButtonRef.current.offsetParent.offsetTop
        }}
      PaperProps={{ 
        elevation: 0,
        style: { 
          backgroundColor: '#333',
          position: 'absolute',
          height: '48px',
          width: 180, 
          left: 220 } }}
          BackdropProps={{ 
            style: { backgroundColor: 'transparent', zIndex: -10 } }}
        >
      <List component="div" disablePadding>
          <ListItem button 
            onClick={() => {
              closeCreateDrawer()
              onNewNotebookClick()
            }} >
              <ListItemIcon>
                  <CgNotes style={{ color: 'lightgrey' }} />
              </ListItemIcon>
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    style={{ color: 'lightgrey' }}
                    sx={{
                      marginLeft: '-30px'
                    }}>
                    Notebook
                  </Typography>
              </ListItemText>
          </ListItem>
      </List>
    </Drawer>
  )
}

export default CreateSidebar;