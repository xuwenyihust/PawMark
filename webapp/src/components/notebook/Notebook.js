import React, { useState, useEffect } from 'react';
import NotebookToolbar from './NotebookToolbar';
import NotebookCell from './NotebookCell';
import { updateNotebook } from '../../api';

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

    const saveNotebook = () => {
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
                    <NotebookToolbar 
                        notebook={notebook} 
                        saveNotebook={saveNotebook} />
                    {notebookContent.cells && notebookContent.cells.map((cell, index) => (
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
