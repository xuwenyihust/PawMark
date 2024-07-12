import { Select, MenuItem } from '@mui/material';


const TypeSelect = ({ 
  cell, 
  index, 
  handleChangeCellType
 }) => {
  return(
    <Select
      value={cell.cell_type}
      onChange={(event) => handleChangeCellType(index, event.target.value)}
      style={{ 
          marginTop: '10px',
          fontFamily: 'Arial',
          fontSize: '13px',
          color: 'grey',
          textAlign: 'center',
          backgroundColor: '#f2f2f2'
      }}
      sx={{ bgcolor: '#f2f2f2', height: '22px' }}>
      <MenuItem value={"markdown"}>Markdown</MenuItem>
      <MenuItem value={"code"}>Code</MenuItem>
    </Select>
)};

export default TypeSelect;