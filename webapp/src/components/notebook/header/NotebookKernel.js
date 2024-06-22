import { Tooltip, Box, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { JupyterKernelIcon } from '@datalayer/icons-react';
import { VscTriangleDown } from "react-icons/vsc";
import LoadingButton from '@mui/lab/LoadingButton';
import NotebookModel from '../../../models/NotebookModel';
import config from '../../../config';

const NotebookKernel = ({
  kernelId,
  setSparkAppId
}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const handleRestartKernel = async () => {
    try {
      setIsRestarting(true);
      setMenuOpen(false);
      setSparkAppId(null);
      await NotebookModel.restartKernel(config.jupyterBaseUrl, kernelId);
      setIsRestarting(false);
    } catch (error) {
      console.error('Failed to restart kernel:', error);
    }
  }

  return (
    <Box sx={{ 
        display: 'flex', 
        marginLeft: 'auto' }}>
      {
        kernelId === null ? 
          <Button 
            variant="contained" 
            size="small"
            startIcon={<JupyterKernelIcon />}
            color="error"
            style={{ fontSize: '10px', padding: '3px 6px' }}>
            Not Connected
          </Button> : 

          isRestarting ?
          <LoadingButton 
            variant="contained" 
            size="small"
            loading
            style={{ fontSize: '10px', padding: '3px 6px' }}>
              Restarting...
          </LoadingButton> :

          <Tooltip title={kernelId}>
            <Button 
              variant="contained" 
              size="small"
              startIcon={<JupyterKernelIcon />}
              endIcon={<VscTriangleDown 
                style={{ 
                  fontSize: '10px', 
                  marginLeft: 0, 
                  marginRight: 0 }}
                />}
              onClick={(e) => { setMenuOpen(true); setAnchorEl(e.currentTarget);}}
              style={{ fontSize: '10px', padding: '3px 6px' }}>
              Connected
            </Button>
          </Tooltip>
        }

        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          anchorEl={anchorEl}
          >
          <MenuItem 
            style={{
              fontSize: '12px',
              width: '115px',
            }}
            onClick={handleRestartKernel}>
              Restart Kernel
          </MenuItem>
        </Menu>
    </Box>
  );
}

export default NotebookKernel;