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
  employeeName?: string; // Added employee name to the interface
}

const TimeReportListPage: React.FC = () => {
  const [timeReports, setTimeReports] = useState<TimeReport[]>([]);

  useEffect(() => {
    const fetchTimeReports = async () => {
      try {
        const response = await axios.get<TimeReport[]>(`${API_BASE_URL}/api/time-reports`);
        // Fetching employee names for each time report
        const reportsWithEmployeeNames = await Promise.all(response.data.map(async report => {
          const employeeResponse = await axios.get(`${API_BASE_URL}/api/employees/${report.employeeId}`);
          return {...report, employeeName: employeeResponse.data.name};
        }));
        setTimeReports(reportsWithEmployeeNames);
      } catch (error) {
        console.error('Failed to fetch time reports:', error);
      }
    };

    fetchTimeReports();
  }, []);

  const toggleApproval = async (id: number, isApproved: boolean) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/time-reports/${id}`, { isApproved: !isApproved });
      // Update local state to reflect the change
      setTimeReports(timeReports.map(report => report.id === id ? {...report, isApproved: !isApproved} : report));
    } catch (error) {
      console.error('Failed to update approval status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Time Report List</h1>
      {timeReports && <TimeReportList timeReports={timeReports} toggleApproval={toggleApproval} />}
    </div>
  );
};

export default TimeReportListPage;
