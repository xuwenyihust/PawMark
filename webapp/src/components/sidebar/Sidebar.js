import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgAdd, CgNotes, CgEye, CgCalendarToday, CgAlbum } from "react-icons/cg";
import WorkspaceSidebar from './WorkspaceSidebar'; 
import CreateSidebar from './CreateSidebar';


function Sidebar({ onNewNotebookClick, onExistinNotebookClick }) {
    const [openMainDrawer, setOpenMainDrawer] = useState(true);
    
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const createButtonRef = useRef(null);
    const handleToggleCreateDrawer = () => {
      console.log("Create button Clicked");
      setOpenCreateDrawer(!openCreateDrawer);
    };

    const [openWorkspaceDrawer, setOpenWorkspaceDrawer] = useState(false);
    const workspaceButtonRef = useRef(null);
    const handleToggleWorkspaceDrawer = () => {
      console.log("Workspace button Clicked");
      setOpenWorkspaceDrawer(!openWorkspaceDrawer);
    };

    return (
      <div style={{ padding: 20, marginLeft: 240 }}>
        <Drawer 
          variant="permanent"
          open={openMainDrawer}
          sx={{ width: 200, transition: 'width 0.3s' }}
          PaperProps={{ style: { width: 200 } }}>
            <Toolbar> {/* This Toolbar component pushes the content below the AppBar */}
              <Typography variant="h6" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
                    DataPulse
                </Typography>
            </Toolbar>

            <Typography variant="body1" sx={{ fontFamily: 'Roboto', mt: 4 }}>
                OVERVIEW
            </Typography>

            <List>
                <ListItem button ref={createButtonRef} onClick={handleToggleCreateDrawer} >
                  <ListItemIcon>
                      <CgAdd style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Create" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem>

                {openCreateDrawer && (
                  <CreateSidebar 
                    openCreateDrawer={openCreateDrawer}
                    handleToggleCreateDrawer={handleToggleCreateDrawer}
                    createButtonRef={createButtonRef}
                    onNewNotebookClick={onNewNotebookClick}/>
                )}

                <ListItem button ref={workspaceButtonRef} onClick={handleToggleWorkspaceDrawer} >
                  <ListItemIcon>
                      <CgAlbum style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Workspace" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem>
                
                { openWorkspaceDrawer && (
                  <WorkspaceSidebar 
                  openWorkspaceDrawer={openWorkspaceDrawer} 
                  top={workspaceButtonRef.current.offsetTop + workspaceButtonRef.current.offsetParent.offsetTop} 
                  handleToggleWorkspaceDrawer={handleToggleWorkspaceDrawer}
                  onExistinNotebookClick={onExistinNotebookClick} />
                )}

                <ListItem button>
                  <ListItemIcon>
                      <CgEye style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="History Server" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                      <CgCalendarToday style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Scheduler" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem>
            </List>
            
        </Drawer>
      </div>
    );
}

export default Sidebar;

