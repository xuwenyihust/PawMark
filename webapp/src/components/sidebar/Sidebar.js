import React, { useState, useRef, useEffect } from 'react';
import { Button, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgAdd, CgEye, CgCalendarToday, CgAlbum } from "react-icons/cg";
import WorkspaceSidebar from './WorkspaceSidebar'; 
import CreateSidebar from './CreateSidebar';
import { ReactComponent as Logo } from '../../assets/logo_#333.svg';

function Sidebar({ 
      jupyterBaseUrl, 
      onNewNotebookClick, 
      onExistinNotebookClick, 
      onHistoryServerClick,
      handleDirectoryClick,
      openWorkspaceDrawer,
      setOpenWorkspaceDrawer,
      currentPath,
      setCurrentPath,
      workspaceFiles }) {
    const [openMainDrawer, setOpenMainDrawer] = useState(true);

    const handleLogoClick = async () => {
      try {
          const response = await fetch('http://localhost:5002/test');
          const data = await response.json();
          console.log(data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
    
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const createButtonRef = useRef(null);
    const handleToggleCreateDrawer = () => {
      console.log("Create button Clicked");
      setOpenCreateDrawer(!openCreateDrawer);
    };

    const workspaceButtonRef = useRef(null);
    const handleToggleWorkspaceDrawer = () => {
      console.log("Workspace button Clicked");
      setOpenWorkspaceDrawer(!openWorkspaceDrawer);
    };

    const closeWorkspaceDrawer = () => {
      setOpenWorkspaceDrawer(false);
    }

    const closeCreateDrawer = () => {
      setOpenCreateDrawer(false);
    }

    return (
      <div style={{ 
          padding: 0, 
          marginLeft: 240 }}>
        <Drawer 
          variant="permanent"
          open={openMainDrawer}
          sx={{ 
            transition: 'width 0.3s' }}
          PaperProps={{ 
            style: { 
              width: 200 },
            elevation: 0,
            sx: {
              backgroundColor: '#333',
              borderRight: '0.5px solid grey',}
            }}>
            <Toolbar
              style={{ padding: 0 }}> {/* This Toolbar component pushes the content below the AppBar */}
              <Button 
                onClick={handleLogoClick}
                sx={{
                  textTransform: 'none', // Prevents capitalization of the button text
                  color: 'inherit', // Inherits the color from the parent instead of applying button default styles
                  padding: 0 // Removes padding that might affect layout
                }}>
                <Logo style={{ 
                  marginLeft: '-8px',
                  marginBottom: '-10px',
                  height: '60px', 
                  width: '120px' }} />
              </Button>
            </Toolbar>

            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Roboto, sans-serif', 
                fontSize: '13px',
                mt: 4, 
                color: 'lightgrey',
                }}>
                OVERVIEW
            </Typography>

            <List>
                <ListItem button ref={createButtonRef} onClick={handleToggleCreateDrawer} 
                  sx={{ 
                      '&:hover': {
                        backgroundColor: '#555'
                      }
                    }}>
                  <ListItemIcon>
                      <CgAdd style={{ color: 'lightgrey' }} />
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
                        Create
                      </Typography>
                  </ListItemText>
                </ListItem>

                {openCreateDrawer && (
                  <CreateSidebar 
                    openCreateDrawer={openCreateDrawer}
                    closeCreateDrawer={closeCreateDrawer}
                    handleToggleCreateDrawer={handleToggleCreateDrawer}
                    createButtonRef={createButtonRef}
                    onNewNotebookClick={onNewNotebookClick}/>
                )}

                <ListItem button ref={workspaceButtonRef} onClick={handleToggleWorkspaceDrawer} 
                  sx={{
                    '&:hover': {
                      backgroundColor: '#555'
                    }
                  }}>
                  <ListItemIcon>
                      <CgAlbum style={{ color: 'lightgrey' }} />
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
                    Workspace
                  </Typography>
                  </ListItemText>
                </ListItem>
                
                { openWorkspaceDrawer && (
                  <WorkspaceSidebar 
                  jupyterBaseUrl={jupyterBaseUrl}
                  openWorkspaceDrawer={openWorkspaceDrawer} 
                  closeWorkspaceDrawer={closeWorkspaceDrawer}
                  top={workspaceButtonRef.current.offsetTop + workspaceButtonRef.current.offsetParent.offsetTop} 
                  handleToggleWorkspaceDrawer={handleToggleWorkspaceDrawer}
                  onExistinNotebookClick={onExistinNotebookClick} 
                  handleDirectoryClick={handleDirectoryClick}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  workspaceFiles={workspaceFiles}/>
                )}

                <ListItem button onClick={onHistoryServerClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#555'
                    }
                  }}>
                  <ListItemIcon>
                      <CgEye style={{ color: 'lightgrey' }} />
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
                      History Server
                    </Typography>
                  </ListItemText>
                </ListItem>

                <ListItem button
                  sx={{
                    '&:hover': {
                      backgroundColor: '#555'
                    }
                  }}>
                  <ListItemIcon>
                      <CgCalendarToday style={{ color: 'lightgrey' }} />
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
                      Scheduler
                    </Typography>
                  </ListItemText>
                </ListItem>
            </List>
            
        </Drawer>
      </div>
    );
}

export default Sidebar;

