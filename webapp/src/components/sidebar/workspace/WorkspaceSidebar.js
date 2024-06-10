import React, { useState, useRef, useEffect } from 'react';
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, Box } from '@mui/material';
import { CgFileDocument, CgFolder, CgArrowLeftR } from "react-icons/cg";
import WorkspaceSidebarHeader from './WorkspaceSidebarHeader';

function WorkspaceSidebar({ 
    openWorkspaceDrawer, 
    closeWorkspaceDrawer, 
    handleToggleWorkspaceDrawer, 
    onExistinNotebookClick,
    handleDirectoryClick,
    currentPath,
    setCurrentPath,
    refreshKey,
    setRefreshKey,
    workspaceFiles,
    createDirectory}) {

  const handleBackClick = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(parentPath || 'work');  // Navigate to parent directory or root if at top level
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openWorkspaceDrawer}
      onClose={handleToggleWorkspaceDrawer}
      sx={{ 
        width: 300,
        left: 220.5,
        zIndex: 1,
        flexShrink: 0,
        height: 'auto',
        borderLeft: '0.5px solid #333',
        }}
      PaperProps={{ 
        elevation: 0,
        style: { 
          backgroundColor: '#333',
          position: 'absolute',
          height: '100%',
          width: 300, 
          left: 0 } }}
        BackdropProps={{ 
          style: { backgroundColor: 'transparent', zIndex: -10 } }}
      >

      <WorkspaceSidebarHeader
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        refreshKey={refreshKey}
        setRefreshKey={setRefreshKey}
        createDirectory={createDirectory} />

      <List component="div" disablePadding>
        {currentPath && (
          <ListItem button onClick={handleBackClick}>
              <ListItemIcon>
                  <CgArrowLeftR style={{ color: 'lightgrey' }} />
              </ListItemIcon>
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'Roboto', 
                      fontSize: '15px',
                      color: 'lightgrey', 
                      marginLeft: '-30px' 
                    }}>
                    Back
                  </Typography>
              </ListItemText>
          </ListItem>
        )}
        {workspaceFiles.map((file, index) => {
          if (file.type === 'file') {
              return null;  // Do not render anything for regular files
          }

          let IconComponent;
          if (file.type === 'notebook') {
              IconComponent = CgFileDocument;
          } else if (file.type === 'directory') {
              IconComponent = CgFolder;
          }

          return (
          <Tooltip title={file.name} key={index} arrow> 
            <ListItem 
              button 
              key={index}
              onClick={() => {
                  if (file.type === 'directory') {
                    handleDirectoryClick(file.path)
                  } else if (file.type === 'notebook') {
                    onExistinNotebookClick(file.path)
                    closeWorkspaceDrawer();
                  }}}>
                <ListItemIcon>
                  <IconComponent style={{ color: 'lightgrey' }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'Roboto', 
                      fontSize: '15px',
                      color: 'lightgrey', 
                      marginLeft: '-30px' ,
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis'
                    }}>
                    {file.name}
                  </Typography>
                </ListItemText>
            </ListItem>
          </Tooltip>
          );
        })}
      </List>
    </Drawer>
  )
}

export default WorkspaceSidebar;