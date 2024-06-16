import { Typography } from '@mui/material';
import NotebookModel from '../../../models/NotebookModel';


const NotebookTitle = ({
  isNameEditing,
  currentName,
  isNotebookModified,
  handleClickNotebookName,
  handleChangeNotebookName,
  handleSaveNotebookName
}) => {

  return (
    <div>
      {isNameEditing ? (
        <input 
            type="text"
            value={NotebookModel.getNameWithoutExtension(currentName)}
            onChange={handleChangeNotebookName}
            onBlur={handleSaveNotebookName}
            autoFocus
            style={{ 
                border: 'none',
                fontSize: '20px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                color: 'black' }}/>
      ) : (
        <Typography variant="h6" 
          sx={{ fontWeight: 'bold' }}
          onClick={handleClickNotebookName}>
          {NotebookModel.getNameWithoutExtension(currentName)} 
          {isNotebookModified && 
            <span style={{ 
                fontSize: '14px',
                color: 'grey',
                marginLeft: '10px' }}>(Unsaved Changes)</span>}
        </Typography>
      )
    }
    </div>
  );
}

export default NotebookTitle;