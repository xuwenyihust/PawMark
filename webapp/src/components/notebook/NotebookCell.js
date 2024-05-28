import React, { useState } from 'react';
import { Select, MenuItem, Typography, Card, CardHeader, CardContent, TextField, IconButton } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";


function NotebookCell({ cell, index, handleChangeCell, handleDeleteCell, handleChangeCellType}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Card key={index} 
            sx={{ 
                width: '85%',
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
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Select
                  value={cell.cell_type}
                  onChange={(event) => handleChangeCellType(index, event.target.value)}
                  style={{ 
                      fontFamily: 'Arial',
                      fontSize: '13px',
                      color: 'grey',
                      textAlign: 'center',
                      backgroundColor: '#f2f2f2'
                  }}
                  // IconComponent={() => null}
                  sx={{ bgcolor: '#f2f2f2', height: '22px' }}>
                  <MenuItem value={"markdown"}>Markdown</MenuItem>
                  <MenuItem value={"code"}>Code</MenuItem>
                </Select>
              </div>}
              sx={{ bgcolor: '#f2f2f2', height: '5px' }}/>
            <CardContent>
                <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={cell.source}
                    onChange={e => handleChangeCell(e.target.value, index)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
        {(isFocused || isHovered) && (
          <IconButton variant="outlined" aria-label="delete" 
          style={{ 
            height: 30,
            marginTop: 10,
            marginLeft: 0, 
            marginRight: 20 }}>
          <MdDeleteOutline 
            onClick={() => handleDeleteCell(index)}
            size={20} 
            style={{ 
              color: 'grey' }}/>
        </IconButton>
        )}
      </div>        
    )
}

export default NotebookCell;