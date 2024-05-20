import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgAdd, CgNotes, CgEye, CgCalendarToday, CgAlbum } from "react-icons/cg";

function CreateSidebar({ openCreateDrawer, handleToggleCreateDrawer, createButtonRef, onNewNotebookClick }) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openCreateDrawer}
      onClose={handleToggleCreateDrawer}
      sx={{ 
        width: 200, 
        flexShrink: 0,
        height: 'auto',
        top: createButtonRef.current.offsetTop + createButtonRef.current.offsetParent.offsetTop
        }}
      PaperProps={{ 
        style: { 
          position: 'relative',
          height: '48px',
          width: 200, 
          left: 220 } }}>
      <List component="div" disablePadding>
          <ListItem button onClick={onNewNotebookClick} sx={{ pl: 4 }}>
              <ListItemIcon>
                  <CgNotes style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Notebook" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
          </ListItem>
      </List>
    </Drawer>
  )
}

export default CreateSidebar;