import React from 'react';
import config from '../config';

function Scheduler({ showScheduler }) {
  return (
    <div style={{ padding: 20, marginLeft: 240 }}> {/* Adjust marginLeft based on your sidebar width */}
        {showScheduler && (
            <iframe
                src={config.airflowBaseUrl} // Adjust the src as needed
                title="Scheduler"
                style={{ width: '100%', height: '100vh', border: 'none' }}
                allowFullScreen
            />
        )}
        {/* You can add more content or conditional rendering here */}
    </div>
  );
}

export default Scheduler;