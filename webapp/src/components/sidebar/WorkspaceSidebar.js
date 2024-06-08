import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { CgFileDocument, CgFolder, CgArrowLeftR } from "react-icons/cg";

function WorkspaceSidebar({ jupyterBaseUrl, 
    openWorkspaceDrawer, 
    closeWorkspaceDrawer, 
    top, 
    handleToggleWorkspaceDrawer, 
    onExistinNotebookClick,
    handleDirectoryClick,
    currentPath,
    setCurrentPath,
    workspaceFiles}) {

  useEffect(() => {
    calculateHeight();
  }, [workspaceFiles]);

  const handleBackClick = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(parentPath || 'work');  // Navigate to parent directory or root if at top level
  };

  const itemHeight = 48; // Height of one ListItem
  const [workspaceSideBarHeight, setWorkspaceSideBarHeight] = useState(0);

  const calculateHeight = () => {
    // only the directories and notebooks will be counted in the height
    const directoriesAndNotebooks = workspaceFiles.filter(item => item.type === 'directory' || item.type === 'notebook'); // Replace with your actual condition
    const itemCount = directoriesAndNotebooks.length;
    const height = (itemCount + 1) * itemHeight;
    setWorkspaceSideBarHeight(height);
  }

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openWorkspaceDrawer}
      onClose={handleToggleWorkspaceDrawer}
      sx={{ 
        width: 520,
        flexShrink: 0,
        height: 'auto',
        top: top,
        overflow: 'auto'
        }}
      PaperProps={{ 
        elevation: 0,
        style: { 
          backgroundColor: '#333',
          position: 'relative',
          height: `${workspaceSideBarHeight}px`,
          width: 270, 
          left: 220 } }}
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}>
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