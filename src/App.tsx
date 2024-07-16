import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import ProfilePage from './pages/ProfilePage';
import TimeReportListPage from './pages/TimeReportListPage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router basename="/work-report-frontend">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/employees/:employeeId" element={<EmployeeProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/time-reports" element={<TimeReportListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
