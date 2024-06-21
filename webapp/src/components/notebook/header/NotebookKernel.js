import { Tooltip, Box, Button } from '@mui/material';
import { JupyterKernelIcon } from '@datalayer/icons-react';


const NotebookKernel = ({
  kernelId
}) => {

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
          <Tooltip title={kernelId}>
            <Button 
              variant="contained" 
              size="small"
              startIcon={<JupyterKernelIcon />}
              style={{ fontSize: '10px', padding: '3px 6px' }}>
              Connected
            </Button>
          </Tooltip>
          }
    </Box>
  );
}

export default NotebookKernel;