import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Card, CardContent, TextField, IconButton } from '@mui/material';
import { MdOutlineSave, MdDeleteOutline } from "react-icons/md";
import { updateNotebook } from '../api';

function Notebook({ jupyterBaseUrl, showNotebook, notebook }) {
    const [notebookContent, setNotebookContent] = useState({});

    useEffect(() => {
        if (notebook && notebook.content) {
            setNotebookContent(notebook.content);
        }
    }, [notebook]);

    function handleCellChange(newValue, cellIndex) {
        setNotebookContent(prevContent => {
            const newContent = {...prevContent};
            newContent.cells[cellIndex].source = newValue;
            return newContent;
    });}

    const baseUrl = `${jupyterBaseUrl}/api/contents/`

    function saveNotebook() {
        updateNotebook(baseUrl + notebook.path, notebookContent).then((data) => {
            console.log('Notebook saved:', data);
        }).catch((error) => {
            console.error('Failed to save notebook:', error);
        });
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 0, marginLeft: 200 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showNotebook && (
                <div>
                    <Box sx={{ 
                            marginLeft: 0,
                            marginBottom: 5 }}> 
                        <AppBar position="static" color="default" sx={{ backgroundColor: '#fff' }}>
                            <Toolbar>
                                <Box sx={{ 
                                        flexDirection: 'column', 
                                        alignItems: 'start',
                                        mt: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {notebook.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', mt: 0 }}>
                                        <IconButton onClick={saveNotebook} aria-label="save" 
                                            sx={{ 
                                                width: 'auto', 
                                                mt: 0.5 }}>
                                            <MdOutlineSave size={18} style={{ color: 'black' }}/>
                                        </IconButton>
                                        <IconButton aria-label="delete" 
                                            sx={{ 
                                                width: 'auto', 
                                                mt: 0.5 }}>
                                            <MdDeleteOutline size={18} style={{ color: 'black' }}/>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    {notebookContent.cells && notebookContent.cells.map((cell, index) => (
                        <Card key={index} 
                            sx={{ 
                                marginTop: 3,
                                marginBottom: 3,
                                marginLeft: 10,
                                marginRight: 10,
                                borderBottom: 0,
                                borderColor: 'divider',
                                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                '&:focus-visible': {
                                    outline: 'rgba(0, 0, 0, 3)'  // Change this to your desired outline color
                                  }  }}>
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
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notebook;
