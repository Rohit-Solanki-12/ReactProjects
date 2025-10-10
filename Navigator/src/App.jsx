import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigator from './Navigator';


const App = () => {
  return (
    <Router>
      <Navigator />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to Home Page!</h2>} />
          <Route path="/about" element={<h2>Welcome to About Page!</h2>} />
          <Route path="/services" element={<h2>Welcome to Service Page!</h2>} />
          <Route path="/contact" element={<h2>Welcome to Contact Page!</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
