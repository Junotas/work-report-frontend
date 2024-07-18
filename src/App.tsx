import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import ProfilePage from './pages/ProfilePage';
import TimeReportListPage from './pages/TimeReportListPage';
import './index.css';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string>('user');

  return (
    <Router basename="/work-report-frontend">
      <div>
        <Header userRole={userRole} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={<EmployeeListPage userRole={userRole as 'admin' | 'user'} />} />
          <Route path="/employees/:employeeId" element={<EmployeeProfilePage userRole={userRole as 'admin' | 'user'} />} />
          <Route path="/profile" element={<ProfilePage userRole={userRole as 'admin' | 'user'} />} />
          <Route path="/time-reports" element={<TimeReportListPage userRole={userRole as 'admin' | 'user'} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
