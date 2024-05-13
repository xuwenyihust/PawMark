import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/create-notebook">
              {/* Component to handle creating a new notebook */}
              <h1>Create a new Notebook</h1>
            </Route>
            <Route path="/notebook">
              {/* Iframe for Jupyter Notebook */}
              <iframe src="http://localhost:8888" width="100%" height="800px" style={{ border: 'none' }}></iframe>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
