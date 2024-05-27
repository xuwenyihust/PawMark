import React from 'react';
import { Typography, Card, CardHeader, CardContent, TextField } from '@mui/material';

function NotebookCell({ cell, index, handleCellChange}) {
    return (
      <Card key={index} 
          sx={{ 
              marginTop: 1,
              marginBottom: 1,
              marginLeft: 10,
              marginRight: 10,
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
                  onChange={e => handleCellChange(e.target.value, index)}
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
    )
}

export default NotebookCell;