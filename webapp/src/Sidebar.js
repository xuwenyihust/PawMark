import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgNotes, CgEye, CgCalendarToday } from "react-icons/cg";

function Sidebar({ onNotebookClick }) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Drawer for the Sidebar */}
        <Drawer variant="permanent">
            <Toolbar> {/* This Toolbar component pushes the content below the AppBar */}
              <Typography variant="h6" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
                    DataPulse
                </Typography>
            </Toolbar>

            <Typography variant="body1" sx={{ fontFamily: 'Roboto', mt: 4 }}>
                OVERVIEW
            </Typography>

            <List>
                <ListItem button onClick={onNotebookClick}>
                  <ListItemIcon>
                      <CgNotes style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Notebook" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem>

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
      </Box>
    );
}

export default Sidebar;

