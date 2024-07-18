import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import ProfilePage from './pages/ProfilePage';
import TimeReportListPage from './pages/TimeReportListPage';
import './index.css';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string>('user'); // Initialize as 'user'

  return (
    <Router basename="/work-report-frontend">
      <div>
        <Header userRole={userRole} setUserRole={setUserRole} /> {/* Pass userRole and setUserRole */}
        <Routes>
          {/* @ts-expect-error: Ignoring type error for userRole prop */}
          <Route path="/" element={<EmployeeListPage userRole={userRole} />} />
          {/* @ts-expect-error: Ignoring type error for userRole prop */}
          <Route path="/employees/:employeeId" element={<EmployeeProfilePage userRole={userRole} />} />
          {/* @ts-expect-error: Ignoring type error for userRole prop */}
          <Route path="/profile" element={<ProfilePage userRole={userRole} />} />
          {/* @ts-expect-error: Ignoring type error for userRole prop */}
          <Route path="/time-reports" element={<TimeReportListPage userRole={userRole} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
