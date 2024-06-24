import React, { useState, useRef, useEffect } from 'react';
import { Button, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgAdd, CgEye, CgCalendarToday, CgAlbum } from "react-icons/cg";
import WorkspaceSidebar from './workspace/WorkspaceSidebar'; 
import CreateSidebar from './create/CreateSidebar';
import { ReactComponent as Logo } from '../../assets/logo_#222.svg';

function Sidebar({ 
      onNewNotebookClick, 
      onExistinNotebookClick, 
      onHistoryServerClick,
      handleDirectoryClick,
      openWorkspaceDrawer,
      setOpenWorkspaceDrawer,
      currentPath,
      setCurrentPath,
      setRefreshKey,
      workspaceFiles}) {

    const itemHeight = 35;

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
          padding: 0}}>
        <Drawer 
          variant="permanent"
          sx={{ 
            transition: 'width 0.3s' }}
          PaperProps={{ 
            style: { 
              width: 200 },
            elevation: 0,
            sx: {
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
                  marginLeft: '0px',
                  marginBottom: '-10px',
                  height: '60px', 
                  width: '120px' }} />
              </Button>
            </Toolbar>

            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Roboto, sans-serif', 
                fontSize: '12px',
                mt: 4, 
                color: 'grey',
                marginLeft: '22px'
                }}>
                OVERVIEW
            </Typography>

            <List 
              sx={{
                marginLeft: '5px',
              }}>

                {/* Create */}
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
                      },
                      height: `${itemHeight}px`
                    }}>
                  <ListItemIcon>
                      <CgAdd style={{ color: openCreateDrawer ? 'white' : 'white' }} />
                  </ListItemIcon>
                  <ListItemText>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'Roboto', 
                          fontSize: '15px',
                          color: openCreateDrawer ? 'white' : 'white', 
                          marginLeft: '-30px'
                        }}>
                        Create
                      </Typography>
                  </ListItemText>
                </ListItem>

                {openCreateDrawer && (
                  <CreateSidebar 
                    itemHeight={itemHeight}
                    openCreateDrawer={openCreateDrawer}
                    closeCreateDrawer={closeCreateDrawer}
                    handleToggleCreateDrawer={handleToggleCreateDrawer}
                    createButtonRef={createButtonRef}
                    onNewNotebookClick={onNewNotebookClick}/>
                )}

                {/* Workspace */}
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
                    },
                    height: `${itemHeight}px`
                  }}>
                  <ListItemIcon>
                      <CgAlbum style={{ color: openWorkspaceDrawer ? 'white' : 'white' }} />
                  </ListItemIcon>
                  <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'Roboto', 
                      fontSize: '15px',
                      color: openWorkspaceDrawer ? 'white' : 'white', 
                      marginLeft: '-30px' 
                    }}>
                    Workspace
                  </Typography>
                  </ListItemText>
                </ListItem>
                
                { openWorkspaceDrawer && (
                  <WorkspaceSidebar 
                    openWorkspaceDrawer={openWorkspaceDrawer} 
                    closeWorkspaceDrawer={closeWorkspaceDrawer}
                    handleToggleWorkspaceDrawer={handleToggleWorkspaceDrawer}
                    onExistinNotebookClick={onExistinNotebookClick} 
                    handleDirectoryClick={handleDirectoryClick}
                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}
                    setRefreshKey={setRefreshKey}
                    workspaceFiles={workspaceFiles}/>
                )}

                {/* History Server */}
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
                    },
                    height: `${itemHeight}px`
                  }}>
                  <ListItemIcon>
                      <CgEye style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontFamily: 'Roboto', 
                        fontSize: '15px',
                        color: 'white', 
                        marginLeft: '-30px' 
                      }}>
                      History Server
                    </Typography>
                  </ListItemText>
                </ListItem>

                {/* Scheduler */}
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
                    },
                    height: `${itemHeight}px`
                  }}>
                  <ListItemIcon>
                      <CgCalendarToday style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontFamily: 'Roboto', 
                        fontSize: '15px',
                        color: 'white', 
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

