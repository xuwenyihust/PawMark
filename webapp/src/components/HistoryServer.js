import React from 'react';

function HistoryServer({ showHistoryServer }) {
  return (
    <div style={{ padding: 20, marginLeft: 240 }}> {/* Adjust marginLeft based on your sidebar width */}
        {showHistoryServer && (
            <iframe
                src="http://localhost:18081" // Adjust the src as needed
                title="History Server"
                style={{ width: '100%', height: '100vh', border: 'none' }}
                allowFullScreen
            />
        )}
        {/* You can add more content or conditional rendering here */}
    </div>
  );
}

export default HistoryServer;