import { CgArrowLeftR } from "react-icons/cg";
import { Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';


const Back = ({ handleBackClick }) => {
  return (
    <ListItem button onClick={handleBackClick}>
      <ListItemIcon>
          <CgArrowLeftR style={{ color: 'lightgrey' }} />
      </ListItemIcon>
      <ListItemText>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Roboto', 
              fontSize: '15px',
              color: 'lightgrey', 
              marginLeft: '-30px'
            }}>
            Back
          </Typography>
      </ListItemText>
    </ListItem>
  );
}

export default Back;