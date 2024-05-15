import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { CgAdd, CgNotes, CgEye, CgCalendarToday } from "react-icons/cg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Sidebar({ onNotebookClick }) {
    const [openMainDrawer, setOpenMainDrawer] = useState(true);
    const [openNestedDrawer, setOpenNestedDrawer] = useState(false);

    const handleToggleNestedDrawer = () => {
        setOpenNestedDrawer(!openNestedDrawer);
    };

    return (
      <div style={{ padding: 20, marginLeft: 240 }}>
        <Drawer 
          variant="permanent"
          open={openMainDrawer}
          sx={{ width: openNestedDrawer ? 240 : 72, transition: 'width 0.3s' }}>
            <Toolbar> {/* This Toolbar component pushes the content below the AppBar */}
              <Typography variant="h6" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
                    DataPulse
                </Typography>
            </Toolbar>

            <Typography variant="body1" sx={{ fontFamily: 'Roboto', mt: 4 }}>
                OVERVIEW
            </Typography>

            <List>
                <ListItem button onClick={handleToggleNestedDrawer}>
                  <ListItemIcon>
                      <CgAdd style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Create" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem>

                {openNestedDrawer && (
                        <List component="div" disablePadding>
                            <ListItem button onClick={onNotebookClick} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CgNotes style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Notebook" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                            </ListItem>
                        </List>
                    )}

                {/* <ListItem button onClick={onNotebookClick}>
                  <ListItemIcon>
                      <CgNotes style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Notebook" sx={{ fontFamily: 'Roboto', marginLeft: '-30px' }}/>
                </ListItem> */}

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

