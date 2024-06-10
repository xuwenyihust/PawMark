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
                  marginLeft: '-18px',
                  marginBottom: '-10px',
                  height: '80px', 
                  width: '160px' }} />
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
                <ListItem button ref={createButtonRef} onClick={ () => {
                  handleToggleCreateDrawer()
                  setOpenWorkspaceDrawer(false);
                }} 
                  sx={{
                    backgroundColor: openCreateDrawer ? '#555' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#555',
                      },
                      '&:hover .MuiTypography-root': {
                        color: 'white',
                      }
                    }}>
                  <ListItemIcon>
                      <CgAdd style={{ color: openCreateDrawer ? 'white' : 'lightgrey' }} />
                  </ListItemIcon>
                  <ListItemText>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'Roboto', 
                          fontSize: '15px',
                          color: openCreateDrawer ? 'white' : 'lightgrey', 
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

                <ListItem button ref={workspaceButtonRef} onClick={() => {
                  handleToggleWorkspaceDrawer();
                  setOpenCreateDrawer(false);
                }} 
                  sx={{
                    backgroundColor: openWorkspaceDrawer ? '#555' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#555'
                    },
                    '&:hover .MuiTypography-root': {
                      color: 'white',
                    }
                  }}>
                  <ListItemIcon>
                      <CgAlbum style={{ color: openWorkspaceDrawer ? 'white' : 'lightgrey' }} />
                  </ListItemIcon>
                  <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'Roboto', 
                      fontSize: '15px',
                      color: openWorkspaceDrawer ? 'white' : 'lightgrey', 
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

                <ListItem button onClick={() => {
                    onHistoryServerClick(); 
                    setOpenWorkspaceDrawer(false); 
                    setOpenCreateDrawer(false);}}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#555'
                    },
                    '&:hover .MuiTypography-root': {
                      color: 'white',
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

                <ListItem button onClick={() => {
                    setOpenWorkspaceDrawer(false); 
                    setOpenCreateDrawer(false);}
                  }
                  sx={{
                    '&:hover': {
                      backgroundColor: '#555'
                    },
                    '&:hover .MuiTypography-root': {
                      color: 'white',
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

