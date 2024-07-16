import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/employees/:employeeId" element={<EmployeeProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
