import { Typography, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import MoreButton from './MoreButton';

const Item = ({ 
    file,
    index,
    handleDirectoryClick,
    onExistinNotebookClick,
    closeWorkspaceDrawer,
    IconComponent,
    setRefreshKey
  }) => {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListItem 
        button 
        key={index}
        onClick={() => {
            if (file.type === 'directory') {
              handleDirectoryClick(file.path)
            } else if (file.type === 'notebook') {
              onExistinNotebookClick(file.path)
              closeWorkspaceDrawer();
            }}}>
          <ListItemIcon>
            <IconComponent style={{ color: 'lightgrey' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Roboto', 
                fontSize: '15px',
                color: 'lightgrey', 
                marginLeft: '-30px' ,
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                maxWidth: '180px'
              }}>
              {file.name}
            </Typography>
          </ListItemText>
      </ListItem>
      <MoreButton 
        file={file}
        setRefreshKey={setRefreshKey}/>
    </Box>
  );
}

export default Item;