import React from 'react';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Reports from './pages/Reports';
import './assets/style.css'; // jeśli jesteś w App.js

function App() {
  return (
    <Router>
      <Routes>
<Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dodaj" element={<AddTransaction />} />
          <Route path="/raporty" element={<Reports />} />
        </Route>
        <Route path="/" element={<Home />} />      </Routes>
    </Router>
  );
}

export default App;



