import { VscSave, VscRunAll, VscTrash } from "react-icons/vsc";
import Tooltip from '@mui/material/Tooltip';
import { Box, IconButton } from '@mui/material';

const NotebookToolbar = ({ 
  runAllCells, 
  saveNotebook, 
  deleteNotebook
}) => {
  const headerIconSize = 12;

  return (
    <Box sx={{ 
      display: 'flex', 
      marginLeft: -0.6,
      mt: 0 }}>

        {/* Save Button */}
        <Tooltip title="Save Changes">
          <IconButton 
            disableRipple
            onClick={saveNotebook} aria-label="save" 
              sx={{ 
                  width: 'auto',
                  mt: 0.5 }}>
              <VscSave 
                size={headerIconSize} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
                style={{ color: 'black' }}/>
          </IconButton>
        </Tooltip>

        {/* Run All Button */}
        <Tooltip title="Run All Cells">
          <IconButton 
            disableRipple 
            onClick={() => 
              runAllCells()}
            aria-label="run" 
              sx={{ 
                  width: 'auto', 
                  mt: 0.5 }}>
              <VscRunAll 
                size={headerIconSize} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
                style={{ color: 'black' }}/>
          </IconButton>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip title="Delete Notebook">
          <IconButton 
            disableRipple 
            onClick={deleteNotebook} aria-label="delete" 
              sx={{ 
                  width: 'auto', 
                  mt: 0.5 }}>
              <VscTrash 
                size={headerIconSize} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
                style={{ color: 'black' }}/>
          </IconButton>
        </Tooltip>
    </Box>
  )
}

export default NotebookToolbar;