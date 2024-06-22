import { Box, Typography, CardHeader, CircularProgress } from '@mui/material';
import { CgCheck, CgDanger } from "react-icons/cg";
import { CellStatus } from '../CellStatus';
import RunButton from './RunButton';
import TypeSelect from './TypeSelect';
import MoreButton from './MoreButton';
import { CellExecuteResultType } from '../CellExecuteResultType';


function CellHeader({
  cell,
  index,
  cellStatus,
  handleRunCell,
  handleChangeCellType,
  handleCopyCell,
  handelRunAllAboveCells
}) {
  return (
    <CardHeader title={
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          {
            cellStatus === CellStatus.BUSY || 
            cellStatus === CellStatus.INITIALIZING ||
            cellStatus === CellStatus.WAITING ? 
            <CircularProgress size={15} /> :
            <RunButton 
              cell={cell} 
              index={index} 
              handleRunCell={handleRunCell}/>
          } 
          
          { 
            (cellStatus === CellStatus.BUSY || 
                cellStatus === CellStatus.INITIALIZING ||
                cellStatus === CellStatus.WAITING) ?
            <Typography 
              variant="body2"
              style={{ marginLeft: 10 }}
              color="textSecondary">
              {cellStatus}
            </Typography> :
            cell.lastExecutionResult === null ? null :
            (cell.lastExecutionResult === CellExecuteResultType.SUCCESS ?
              <CgCheck style={{ color: 'green', marginLeft: 10 }}/> :
              (cell.lastExecutionResult === CellExecuteResultType.ERROR ?
                <CgDanger size={16} style={{ color: 'red', marginLeft: 10 }}/> : null))    
          }

          { (cellStatus === CellStatus.BUSY || 
                cellStatus === CellStatus.INITIALIZING ||
                cellStatus === CellStatus.WAITING) ? null :
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginLeft: 10 }}>
              {cell.lastExecutionTime}
            </Typography>
          }

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