import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgFileDocument, CgFolder, CgArrowLeftR, CgChevronDown } from "react-icons/cg";


const WorkspaceSidebarHeader = ({
  currentPath,
  setCurrentPath,
  refreshKey,
  setRefreshKey,
  createDirectory
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCreateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Roboto',
            fontSize: '15px',
            color: 'lightgrey',
            fontWeight: 'bold',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px'
          }}>
          Workspace
        </Typography>
        <Button
          endIcon={<CgChevronDown />}
          onClick={handleCreateClick}
          style={{ 
            color: 'lightgrey', 
            marginRight: '20px',
            marginTop: '18px',
            border: '1px solid grey',
            width: '100px',
            height: '30px'
            }}>Create
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCreateClose}
          PaperProps={{
            elevation: 0,
            style: { 
              width: '100px',
              backgroundColor: '#333',
              borderBottom: '1px solid grey',
              borderLeft: '1px solid grey',
              borderRight: '1px solid grey',
            },
          }}
        >
          <MenuItem 
            onClick={() => {
              handleCreateClose();
              createDirectory(currentPath);
              // refresh the workspace to reflect the new directory
              setRefreshKey(oldKey => oldKey + 1);
            }}
            style={{ color: 'lightgrey' }}>Folder</MenuItem>
          <MenuItem 
            onClick={handleCreateClose}
            style={{ color: 'lightgrey' }}>Notebook</MenuItem>
        </Menu>
      </Box>
  );
}

export default WorkspaceSidebarHeader;