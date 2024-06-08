import { MdDeleteOutline, MdArrowDropUp, MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { Box, Select, MenuItem, Typography, Card, CardHeader, CardContent, TextField, IconButton, CircularProgress } from '@mui/material';


function CellSideButtons(
    notebookState,
    index,
    handleDeleteCell,
    handleMoveCell) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'top' }}>
      <IconButton aria-label="delete" 
        disableRipple
        onClick={() => handleDeleteCell(index)}
        style={{ 
          height: 20,
          marginTop: 10,
          marginLeft: 0, 
          marginRight: 0 }}>
        <MdDeleteOutline 
          size={20} 
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'grey';
          }}
          style={{ 
            color: 'grey' }}/>
      </IconButton>

      {index !== 0 && 
        <IconButton 
          disableRipple
          onClick={() => handleMoveCell(index, index-1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'grey';
          }}
          style={{ marginLeft: 0, marginTop: 2, marginBottom: 2 }}>
          <MdArrowDropUp
            size={20}  />
        </IconButton>}
      {index !== notebookState.content.cells.length - 1 && 
        <IconButton 
          disableRipple
          onClick={() => handleMoveCell(index, index+1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'grey';
          }}
          style={{ marginLeft: 0, marginTop: 2, marginBottom: 2 }}>
          <MdArrowDropDown
            size={20}  />
        </IconButton>}
    </div>
  );
}

export default CellSideButtons;