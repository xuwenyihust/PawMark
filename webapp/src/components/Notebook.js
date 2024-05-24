import React from 'react';
import { Box, AppBar, Toolbar, Typography, Card, CardContent, TextField, Button } from '@mui/material';

function Notebook({ showNotebook, notebookSrc, notebook }) {
    return (
        <div style={{ paddingLeft: 20, paddingRight: 0, marginLeft: 200 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showNotebook && (
                <div>
                    <Box sx={{ 
                            marginLeft: 0,
                            marginBottom: 5 }}> 
                        <AppBar position="static" color="default" sx={{ backgroundColor: '#fff' }}>
                            <Toolbar>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {notebook.name}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    {notebook.content.cells.map((cell, index) => (
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
