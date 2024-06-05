import { Box, Select, MenuItem, Typography, Card, CardHeader, CardContent, IconButton, CircularProgress } from '@mui/material';
import { MdArrowRight } from "react-icons/md";
import { CellStatus } from './CellStatus';


function CellHeader({
  cell,
  index,
  cellStatus,
  handleRunCell,
  handleChangeCellType
}) {
  return (
    <CardHeader title={
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
        {cellStatus === CellStatus.BUSY || 
          cellStatus === CellStatus.INITIALIZING ||
          cellStatus === CellStatus.WAITING ? 
          <CircularProgress size={15} /> :
          <IconButton 
            disableRipple
            aria-label="run" 
            style={{
              height: 40,
              width: 40,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: -15, 
              marginRight: 0 }}>
            <MdArrowRight 
              onClick={() => handleRunCell(cell, index)}
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
          } { (cellStatus === CellStatus.BUSY || 
              cellStatus === CellStatus.INITIALIZING ||
              cellStatus === CellStatus.WAITING) &&
          <Typography 
            variant="body2"
            style={{ marginLeft: 10 }}
            color="textSecondary">
            {cellStatus}
          </Typography>}
        </Box>
        <Select
          value={cell.cell_type}
          onChange={(event) => handleChangeCellType(index, event.target.value)}
          style={{ 
              marginTop: 10,
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
      </Box>}
      sx={{ bgcolor: '#f2f2f2', height: '5px' }}/>
  )
}

export default CellHeader;