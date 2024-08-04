import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { BsPerson, BsEnvelope, BsBoxArrowLeft } from "react-icons/bs";


function AccountSidebar({
  itemHeight,
  accountButtonRef,
  openAccountDrawer,
  handleToggleAccountDrawer,
  username,
  useremail,
  logout
}) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openAccountDrawer}
      onClose={handleToggleAccountDrawer}
      sx={{ 
        width: 250, 
        zIndex: 1,
        flexShrink: 0,
        height: 'auto',
        left: 200,
        top: accountButtonRef.current.offsetTop
          + accountButtonRef.current.offsetParent.offsetTop
          - itemHeight * 2
        }}
      PaperProps={{ 
        elevation: 0,
        style: { 
          position: 'absolute',
          height: `${itemHeight * 3}px`,
          width: 250, 
          paddingLeft: 0
        } }}
          BackdropProps={{ 
            style: { backgroundColor: 'transparent', zIndex: -10 } }}
        >

      <List component="div"
        disablePadding>
          <ListItem button 
            onClick={() => {
            }} 
            sx={{
                // '&:hover': {
                //   backgroundColor: '#555',
                // },
                // '&:hover .MuiTypography-root': {
                //   color: 'white',
                // },
                marginTop: '-5px',
              }}>
              <ListItemIcon>
                <BsPerson 
                  style={{ color: 'white' }}
                  sx={{
                    marginLeft: '100px'
                  }} />
              </ListItemIcon>
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{
                      marginLeft: '-30px'
                    }}
                    style={{ color: 'white' }}>
                      {username}
                  </Typography>
              </ListItemText>
          </ListItem>

          <ListItem button 
            onClick={() => {
            }} 
            sx={{
                marginTop: '-12px',
              }}>
              <ListItemIcon>
                <BsEnvelope 
                  style={{ color: 'white' }}
                  sx={{
                    marginLeft: '100px'
                  }} />
              </ListItemIcon>
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{
                      marginLeft: '-30px'
                    }}
                    style={{ color: 'white' }}>
                      {useremail}
                  </Typography>
              </ListItemText>
          </ListItem>

          <ListItem button 
            onClick={() => {
              logout();
            }} 
            sx={{
                marginTop: '-12px',
              }}>
              <ListItemIcon>
                <BsBoxArrowLeft 
                  style={{ color: 'white' }}
                  sx={{
                    marginLeft: '100px'
                  }} />
              </ListItemIcon>
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    sx={{
                      marginLeft: '-30px'
                    }}
                    style={{ color: 'white' }}>
                      Log out
                  </Typography>
              </ListItemText>
          </ListItem>
      </List>
    </Drawer>
  );
}

export default AccountSidebar;