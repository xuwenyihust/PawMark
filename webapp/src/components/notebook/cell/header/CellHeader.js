import { Box, Typography, CardHeader, CircularProgress } from '@mui/material';
import { CellStatus } from '../CellStatus';
import RunButton from './RunButton';
import TypeSelect from './TypeSelect';
import MoreButton from './MoreButton';


function CellHeader({
  cell,
  index,
  cellStatus,
  setCellExecutedStatus,
  handleRunCell,
  handleChangeCellType,
  handleCopyCell,
  handelRunAllAboveCells
}) {
  return (
    <CardHeader title={
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
        {cellStatus === CellStatus.BUSY || 
          cellStatus === CellStatus.INITIALIZING ||
          cellStatus === CellStatus.WAITING ? 
          <CircularProgress size={15} /> :
          <RunButton 
            cell={cell} 
            index={index} 
            handleRunCell={handleRunCell}/>
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
        <Box display="flex" justifyContent="flex-end">
          <TypeSelect 
            cell={cell} 
            index={index} 
            handleChangeCellType={handleChangeCellType} />
          <MoreButton 
            cell={cell}
            index={index}
            handleCopyCell={handleCopyCell}
            handelRunAllAboveCells={handelRunAllAboveCells}/>
        </Box>
      </Box>}
      sx={{ bgcolor: '#f2f2f2', height: '5px' }}/>
  )
}

export default CellHeader;