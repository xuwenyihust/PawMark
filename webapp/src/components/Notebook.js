import React from 'react';

function Notebook({ showNotebook, notebookSrc }) {
    return (
        <div style={{ padding: 20, marginLeft: 240 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showNotebook && (
                <iframe
                    src={notebookSrc} // Adjust the src as needed
                    title="Jupyter Notebook"
                    style={{ width: '100%', height: '100vh', border: 'none' }}
                    allowFullScreen
                />
            )}
            {/* You can add more content or conditional rendering here */}
        </div>
    );
}

export default Notebook;
