import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import TimeReportList from '../components/TimeReportList';

interface TimeReport {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

const TimeReportListPage: React.FC = () => {
  // Declare state with specific type
  const [timeReports, setTimeReports] = useState<TimeReport[]>([]);

  useEffect(() => {
    const fetchTimeReports = async () => {
      try {
        const response = await axios.get<TimeReport[]>(`${API_BASE_URL}/api/time-reports`);
        setTimeReports(response.data);
      } catch (error) {
        console.error('Failed to fetch time reports:', error);
      }
    };

    fetchTimeReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Time Report List</h1>
      {timeReports && <TimeReportList timeReports={timeReports} />}
    </div>
  );
};

export default TimeReportListPage;
