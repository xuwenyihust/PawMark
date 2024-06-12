import React, { useState, useRef, useEffect } from 'react';
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgFolderAdd, CgNotes } from "react-icons/cg";

function CreateSidebar({ 
    itemHeight,
    openCreateDrawer, 
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
        width: 180, 
        zIndex: 1,
        flexShrink: 0,
        height: 'auto',
        left: 200,
        top: createButtonRef.current.offsetTop + createButtonRef.current.offsetParent.offsetTop,
        }}
      PaperProps={{ 
        elevation: 0,
        style: { 
          position: 'absolute',
          height: `${itemHeight}px`,
          width: 180, 
          paddingLeft: 0
        } }}
          BackdropProps={{ 
            style: { backgroundColor: 'transparent', zIndex: -10 } }}
        >
      <List component="div" 
        disablePadding>
          <ListItem button 
            onClick={() => {
              closeCreateDrawer()
              onNewNotebookClick()
            }} 
            sx={{
                '&:hover': {
                  backgroundColor: '#555',
                },
                '&:hover .MuiTypography-root': {
                  color: 'white',
                },
                marginTop: '-5px',
              }}>
              <ListItemIcon>
                  <CgNotes style={{ 
                    color: 'lightgrey',
                    marginLeft: '10px'  }} />
              </ListItemIcon>
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    style={{ color: 'lightgrey' }}
                    sx={{
                      marginLeft: '-10px'
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