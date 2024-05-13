import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Notebook from './Notebook';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CgNotes, CgEye, CgCalendarToday } from "react-icons/cg";

// Create a theme instance.
const theme = createTheme({
  components: {
      MuiDrawer: {
          styleOverrides: {
              paper: {
                  backgroundColor: '#333', // Dark grey
                  color: '#fff', // White text color
                  paddingLeft: '20px',
                  width: '200px',
                  justifyContent: 'left',
              },
          },
      },
  },
});


const App = () => {
  const [showIframe, setShowIframe] = useState(false);

  const handleNotebookClick = () => {
    setShowIframe(!showIframe);
    console.log("Notebook Clicked");
  };

  return (
      <ThemeProvider theme={theme}>
        <Sidebar onNotebookClick={handleNotebookClick} />
        <Notebook showIframe={showIframe} />
          {/* <Container component="main" maxWidth="xl" sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
            
          </Container> */}
          
          {/* Main Content Area - where the notebook iframe will be displayed */}
          {/* <Container component="main" maxWidth="xl" sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
              <iframe
                  src="http://localhost:8888" // Adjust this URL as needed
                  title="Jupyter Notebook"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
              />
          </Container> */}
      </ThemeProvider>
  );
};

export default App;
