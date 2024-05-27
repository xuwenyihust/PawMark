import React, { useState, useEffect } from 'react';
import NotebookToolbar from './NotebookToolbar';
import NotebookCell from './NotebookCell';
import { updateNotebook } from '../../api';

function Notebook({ jupyterBaseUrl, 
    showNotebook, 
    notebook,
    notebookState,
    setNotebookState,
    handleDeleteNotebook }) {
    // const [notebookState, setNotebookState] = useState({}); 

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

    const baseUrl = `${jupyterBaseUrl}/api/contents/`

    const handleUpdateNotebook = () => {
        updateNotebook(baseUrl + notebook.path, notebookState.content).then((data) => {
            console.log('Notebook saved:', data);
        }).catch((error) => {
            console.error('Failed to save notebook:', error);
        });
    }

    // const handleDeleteNotebook = () => {
    //     deleteNotebook(baseUrl + notebook.path).then((data) => {
    //         setNotebookState({}); // Clear notebook content
    //         console.log('Notebook deleted:', notebookState);
    //     }).catch((error) => {
    //         console.error('Failed to delete notebook:', error);
    //     });
    // }

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
                        <NotebookCell 
                            cell={cell}
                            index={index}
                            handleCellChange={handleCellChange}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notebook;
