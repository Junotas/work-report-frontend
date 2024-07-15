import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/employees/:employeeId" element={<EmployeeProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
