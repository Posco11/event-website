import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventCarousel from './pages/event.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventCarousel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
