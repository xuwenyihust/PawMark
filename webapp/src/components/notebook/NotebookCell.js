import React from 'react';
import { Typography, Card, CardHeader, CardContent, TextField, IconButton } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";


function NotebookCell({ cell, index, handleChangeCell, handleDeleteCell}) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Card key={index} 
            sx={{ 
                width: '90%',
                marginTop: 1,
                marginBottom: 1,
                marginLeft: 10,
                marginRight: 1,
                borderBottom: 0,
                borderColor: 'divider',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                '&:focus-visible': {
                    outline: 'rgba(0, 0, 0, 3)'  // Change this to your desired outline color
                  }  }}>
            <CardHeader title={
              <Typography variant="body1" 
                style={{ 
                    fontFamily: 'Arial',
                    fontSize: '13px',
                    color: 'grey',
                    textAlign: 'right'}}>
                  {`${cell.cell_type}`}
              </Typography>} 
              sx={{ bgcolor: '#f2f2f2', height: '5px' }}/>
            <CardContent>
                <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={cell.source}
                    onChange={e => handleChangeCell(e.target.value, index)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0)', // Change this to adjust the color
                            },
                            '&:hover fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0)', // Change this to adjust the hover color
                            },
                            '&.Mui-focused fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.1)', // Change this to adjust the focus color
                            },
                        },
                    }}
                    />
            </CardContent>
        </Card>   
        <IconButton variant="outlined" aria-label="delete" 
          style={{ 
            height: 30,
            marginTop: 10,
            marginLeft: 1, 
            marginRight: 20 }}>
          <MdDeleteOutline 
            onClick={() => handleDeleteCell(index)}
            size={20} 
            style={{ 
              color: 'grey' }}/>
        </IconButton>
      </div>        
    )
}

export default NotebookCell;