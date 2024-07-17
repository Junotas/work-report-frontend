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
  const [employees, setEmployees] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<{ id: number; name: string }[]>(`${API_BASE_URL}/api/employees`);
        const employeeMap = response.data.reduce((acc, employee) => {
          acc[employee.id] = employee.name;
          return acc;
        }, {} as { [key: number]: string });
        setEmployees(employeeMap);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    const fetchTimeReports = async () => {
      try {
        const response = await axios.get<TimeReport[]>(`${API_BASE_URL}/api/time-reports`);
        setTimeReports(response.data);
      } catch (error) {
        console.error('Failed to fetch time reports:', error);
      }
    };

    fetchEmployees();
    fetchTimeReports();
  }, []);

  const toggleApproval = async (id: number, isApproved: boolean) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/time-reports/approve/${id}`, { isApproved: !isApproved });
      // Update local state to reflect the change
      setTimeReports(timeReports.map(report => report.id === id ? { ...report, isApproved: !isApproved } : report));
    } catch (error) {
      console.error('Failed to update approval status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Time Report List</h1>
      {timeReports && <TimeReportList timeReports={timeReports} employees={employees} toggleApproval={toggleApproval} />}
    </div>
  );
};

export default TimeReportListPage;
