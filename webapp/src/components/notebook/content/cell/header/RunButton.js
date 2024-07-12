import React from 'react';
import { MdArrowRight } from "react-icons/md";
import { IconButton } from '@mui/material';


const RunButton = ({ 
  cell, 
  index, 
  handleRunCell
 }) => {
  return (
    <IconButton 
      disableRipple
      onClick={() => handleRunCell(cell, index)}
      aria-label="run" 
      style={{
        height: 40,
        width: 40,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: -15, 
        marginRight: 0 }}>
      <MdArrowRight 
        size={40} 
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'blue';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'grey';
        }}
        style={{ 
          color: 'grey' }}/>
      </IconButton> 
  );
}

export default RunButton;