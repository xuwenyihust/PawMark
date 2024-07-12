import { useState } from 'react';
import { CgMoreVerticalAlt } from "react-icons/cg";
import { Menu, MenuItem } from '@mui/material';


const MoreButton = ({ 
  cell, 
  index,
  handleCopyCell,
  handelRunAllAboveCells
 }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClicked = (event, cell, cellIndex) => {
    console.log('More clicked:', cell, cellIndex);
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CgMoreVerticalAlt 
        onClick={(event) => handleMoreClicked(event, cell, index)}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'black';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'grey';
        }}
        style={{
          color: 'grey',
          fontSize: '20px',
          marginTop: '10px',
          marginBottom: 0,
          marginLeft: '10px', 
          marginRight: 0
        }}
      />
      <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem 
          onClick={() => {
            handleCopyCell(index)
            handleClose()}}
          >Copy Cell</MenuItem>
        <MenuItem 
          onClick={() => {
            handelRunAllAboveCells(index)
            handleClose()}}
          >Run All Above</MenuItem>
      </Menu>
    </div>
  );
}

export default MoreButton;