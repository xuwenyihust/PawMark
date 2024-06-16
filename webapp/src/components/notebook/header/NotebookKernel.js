import { Tooltip, Box, Button } from '@mui/material';


const NotebookKernel = ({
  kernelId
}) => {

  return (
    <Box sx={{ 
        display: 'flex', 
        marginLeft: 'auto', 
        marginTop: 3,
        justifyContent: 'flex-end' }}>
      {
        kernelId === null ? 
          <Button 
            variant="outlined" 
            size="small"
            color="error">
            Not Connected
          </Button> : 
          <Tooltip title={kernelId}>
            <Button 
              variant="outlined" 
              size="small">
              Connected
            </Button>
          </Tooltip>
          }
    </Box>
  );
}

export default NotebookKernel;