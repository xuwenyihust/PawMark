import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';
import NotebookToolbar from './NotebookToolbar';
import NotebookCell from './NotebookCell';
import { updateNotebook } from '../../api';

function Notebook({ jupyterBaseUrl, 
    showNotebook, 
    notebook,
    notebookState,
    setNotebookState,
    handleDeleteNotebook }) {

    useEffect(() => {
        if (notebook && notebook.content) {
            setNotebookState(notebook);
        }
    }, [notebook]);

    function handleCellChange(newValue, cellIndex) {
        setNotebookState(prevState => {
            const newState = {...prevState};
            newState.content.cells[cellIndex].source = newValue;
            return newState;
    });}

    const createCell = (type = 'code', index) => {
        const newCell = {
            cell_type: type,
            metadata: {},
            source: [],
        };

        if (type === 'code') {
            newCell.execution_count = null;
            newCell.outputs = [];
        }
    
        setNotebookState(prevState => {
            const cells = [...prevState.content.cells];
            cells.splice(index, 0, newCell);
            return {
                ...prevState,
                content: {
                    ...prevState.content,
                    cells: cells,
                }
            };
        });
    }

    const baseUrl = `${jupyterBaseUrl}/api/contents/`

    const handleUpdateNotebook = () => {
        updateNotebook(baseUrl + notebook.path, notebookState.content).then((data) => {
            console.log('Notebook saved:', data);
        }).catch((error) => {
            console.error('Failed to save notebook:', error);
        });
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 0, marginLeft: 200 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showNotebook && (
                <div>
                    {notebookState.name && 
                        <NotebookToolbar 
                            notebook={notebookState} 
                            saveNotebook={handleUpdateNotebook}
                            deleteNotebook={handleDeleteNotebook} />
                    }
                    {notebookState.content && 
                        notebookState.content.cells && 
                        notebookState.content.cells.map((cell, index) => (
                        <div style={{ position: 'relative' }}>
                            <NotebookCell
                                cell={cell}
                                index={index}
                                handleCellChange={handleCellChange} />
                            <div 
                                style={{ 
                                    display: 'flex',
                                    justifyContent: 'center'}}>
                                <Tooltip title="Add Code Cell" 
                                    sx={{fontSize: 11,
                                    color: "grey"}}>
                                    <Button onClick={() => createCell('code', index + 1)}>
                                        + Code
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Add Code Cell"
                                    sx={{fontSize: 11,
                                    color: "grey"}}>
                                    <Button onClick={() => createCell('markdown', index + 1)}>
                                        + Markdown
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notebook;
