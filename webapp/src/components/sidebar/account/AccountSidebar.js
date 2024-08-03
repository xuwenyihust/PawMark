import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';


function AccountSidebar({
  itemHeight,
  accountButtonRef,
  openAccountDrawer,
  handleToggleAccountDrawer,
  username,
  useremail
}) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openAccountDrawer}
      onClose={handleToggleAccountDrawer}
      sx={{ 
        width: 180, 
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
          width: 180, 
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
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    style={{ color: 'white' }}
                    >
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
              <ListItemText>
                  <Typography 
                    variant="body1" 
                    style={{ color: 'white' }}
                    >
                      {useremail}
                  </Typography>
              </ListItemText>
          </ListItem>
      </List>
    </Drawer>
  );
}

export default AccountSidebar;