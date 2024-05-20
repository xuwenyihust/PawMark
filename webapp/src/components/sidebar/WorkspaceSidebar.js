import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgFileDocument, CgFolder, CgArrowLeftR } from "react-icons/cg";
import { fetchFiles } from '../../api';

function WorkspaceSidebar({ openWorkspaceDrawer, top, handleToggleWorkspaceDrawer, onExistinNotebookClick}) {
  const baseUrl = `http://localhost:8888/api/contents/`
  const [currentPath, setCurrentPath] = useState('work');
  const [workspaceFiles, setWorkspaceFiles] = useState([]);

  useEffect(() => {
    if (openWorkspaceDrawer) {
        fetchFiles(baseUrl + currentPath) // Fetch files from the root or specify a path
            .then(setWorkspaceFiles)
            .catch(error => console.error('Failed to fetch files:', error));
    }
  }, [openWorkspaceDrawer, currentPath]);

  const handleDirectoryClick = (path) => {
    setCurrentPath(path);  // Update the path to fetch and display new contents
  };

  const handleBackClick = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(parentPath || 'work');  // Navigate to parent directory or root if at top level
  };

  const itemHeight = 48; // Height of one ListItem
  const calculatedHeight = workspaceFiles.length * itemHeight;

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openWorkspaceDrawer}
      onClose={handleToggleWorkspaceDrawer}
      sx={{ 
        width: 200, 
        flexShrink: 0,
        height: 'auto',
        top: top
        }}
      PaperProps={{ 
        style: { 
          position: 'relative',
          height: `${calculatedHeight}px`,
          width: 200, 
          left: 220 } }}>
      <List component="div" disablePadding>
        {currentPath && (
          <ListItem button onClick={handleBackClick}>
              <ListItemIcon>
                  <CgArrowLeftR style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Back" />
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
          <ListItem 
            button 
            key={index}
            onClick={() => {
                if (file.type === 'directory') {
                  handleDirectoryClick(file.path)
                } else if (file.type === 'notebook') {
                  onExistinNotebookClick(file.path)
                }}}>
              <ListItemIcon>
                <IconComponent style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={file.name} />
          </ListItem>
          );
        })}
      </List>
    </Drawer>
  )
}

export default WorkspaceSidebar;