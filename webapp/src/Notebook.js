import React from 'react';

function Notebook({ showIframe }) {
    return (
        <div style={{ padding: 20, marginLeft: 240 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showIframe && (
                <iframe
                    src="http://localhost:8888" // Adjust the src as needed
                    title="Jupyter Notebook"
                    style={{ width: '100%', height: '600px', border: 'none' }}
                    allowFullScreen
                />
            )}
            {/* You can add more content or conditional rendering here */}
        </div>
    );
}

export default Notebook;
