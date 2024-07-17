import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import TimeReportList from '../components/TimeReportList';

interface Employee {
  id: number;
  name: string;
}

interface TimeReport {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  employeeName?: string;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

const TimeReportListPage: React.FC = () => {
  const [timeReports, setTimeReports] = useState<TimeReport[]>([]);

  useEffect(() => {
    const fetchTimeReports = async () => {
      try {
        const [timeReportsResponse, employeesResponse] = await Promise.all([
          axios.get<TimeReport[]>(`${API_BASE_URL}/api/time-reports`),
          axios.get<Employee[]>(`${API_BASE_URL}/api/employees`),
        ]);

        console.log('Time Reports:', timeReportsResponse.data);  // Log the fetched time reports
        console.log('Employees:', employeesResponse.data);  // Log the fetched employees

        const reportsWithEmployeeNames = timeReportsResponse.data.map(report => {
          const employee = employeesResponse.data.find(emp => emp.id === report.employee.id);
          return { ...report, employeeName: employee ? employee.name : 'Unknown' };
        });

        console.log('Reports with Employee Names:', reportsWithEmployeeNames);  // Log the final mapped time reports
        setTimeReports(reportsWithEmployeeNames);
      } catch (error) {
        console.error('Failed to fetch time reports or employees:', error);
      }
    };

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

  const deleteTimeReport = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/time-reports/${id}`);
      // Update local state to remove the deleted time report
      setTimeReports(timeReports.filter(report => report.id !== id));
    } catch (error) {
      console.error('Failed to delete time report:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Time Report List</h1>
      {timeReports && <TimeReportList timeReports={timeReports} toggleApproval={toggleApproval} deleteTimeReport={deleteTimeReport} />}
    </div>
  );
};

export default TimeReportListPage;
