import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Players from './components/Players/Players';
import SeeDetails from './components/SeeDetails/SeeDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Players />} />
      <Route path="/:playerId" element={<SeeDetails />} />
    </Routes>
  </Router>
);

export default App;