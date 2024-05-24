import React from 'react';
// import { NotebookApp } from '@nteract/core';


function Notebook({ showNotebook, notebookSrc, notebook }) {
    return (
        <div style={{ padding: 20, marginLeft: 240 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showNotebook && (
                <div>
                    {notebook.content.cells.map((cell, index) => {
                        return (
                            <div key={index}>
                                {cell.source}
                            </div>
                        );
                    })}
                </div>

                // <iframe
                //     src={notebookSrc} // Adjust the src as needed
                //     title="Jupyter Notebook"
                //     style={{ width: '100%', height: '100vh', border: 'none' }}
                //     allowFullScreen
                // />
            )}
            {/* You can add more content or conditional rendering here */}
        </div>
    );
}

export default Notebook;
