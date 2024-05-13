import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', height: '100vh', background: '#333', color: '#fff' }}>
      <ul style={{ listStyleType: 'none', padding: 20 }}>
        <li><Link to="/create-notebook">Create Notebook</Link></li>
        <li><Link to="/notebook">View Notebook</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
