import React, { useEffect, useState } from 'react';
import TimeReportList from '../components/TimeReportList';
import { fetchTimeReports } from '../services/timeReportService';

const TimeReportListPage: React.FC = () => {
  const [timeReports, setTimeReports] = useState([]);

  useEffect(() => {
    const getTimeReports = async () => {
      const reports = await fetchTimeReports();
      setTimeReports(reports);
    };
    getTimeReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Time Reports</h1>
      </header>
      <TimeReportList timeReports={timeReports} />
    </div>
  );
};

export default TimeReportListPage;
