import React, { useState, useRef, useEffect } from 'react';
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, Box } from '@mui/material';
import { CgFileDocument, CgFolder } from "react-icons/cg";
import WorkspaceSidebarHeader from './WorkspaceSidebarHeader';
import Back from './Back';
import Item from './Item';

function WorkspaceSidebar({ 
    itemHeight,
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

  const workspaceSidebarWidth = 300; 

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
        width: workspaceSidebarWidth,
        left: 200,
        zIndex: 1,
        flexShrink: 0,
        height: 'auto',
        borderLeft: '0.5px solid #333',
        }}
      PaperProps={{ 
        elevation: 0,
        style: { 
          position: 'absolute',
          height: '100%',
          width: workspaceSidebarWidth, 
          left: 0 } }}
        BackdropProps={{ 
          style: { backgroundColor: 'transparent', zIndex: -10 } }}>

      <WorkspaceSidebarHeader
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        refreshKey={refreshKey}
        setRefreshKey={setRefreshKey}
        createDirectory={createDirectory} />

      <List component="div" 
        sx={{
          marginLeft: '10px'
        }}
        disablePadding>
        {currentPath && (
          <Back handleBackClick={handleBackClick}/>
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
            <Item 
              file={file} 
              index={index}
              handleDirectoryClick={handleDirectoryClick}
              onExistinNotebookClick={onExistinNotebookClick}
              closeWorkspaceDrawer={closeWorkspaceDrawer}
              IconComponent={IconComponent}
              refreshKey={refreshKey}
              setRefreshKey={setRefreshKey}/>
          );
        })}
      </List>
    </Drawer>
  )
}

export default WorkspaceSidebar;