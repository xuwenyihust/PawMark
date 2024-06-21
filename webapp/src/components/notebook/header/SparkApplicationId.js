import { Tooltip, Box, Button } from '@mui/material';
import { ReactComponent as SparkIcon } from '../../../assets/spark-logo-rev.svg';

const SparkApplicationId= ({
  sparkAppId
}) => {
  return (
    <Box sx={{ 
        display: 'flex', 
        marginLeft: 'auto',
        marginRight: 3 }}>
      {
        sparkAppId === null ? 
          null :
          <Tooltip title={sparkAppId}>
            <Button 
              variant="contained" 
              size="small"
              startIcon={<SparkIcon
                  style={{
                    height: '19px', 
                    width: '19px'
                  }} />}
              style={{ 
                fontSize: '10px', 
                padding: '3px 6px',
                backgroundColor: '#FF8C11', 
                color: 'white',
                textTransform: 'none' 
                }}>
              {sparkAppId}
            </Button>
          </Tooltip>
    }
    </Box>
  );
}

export default SparkApplicationId;