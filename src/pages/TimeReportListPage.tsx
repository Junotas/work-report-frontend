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

interface TimeReportListPageProps {
  userRole: 'admin' | 'user';
}

const TimeReportListPage: React.FC<TimeReportListPageProps> = ({ userRole }) => {
  const [timeReports, setTimeReports] = useState<TimeReport[]>([]);

  useEffect(() => {
    const fetchTimeReports = async () => {
      try {
        const [timeReportsResponse, employeesResponse] = await Promise.all([
          axios.get<TimeReport[]>(`${API_BASE_URL}/api/time-reports`),
          axios.get<Employee[]>(`${API_BASE_URL}/api/employees`),
        ]);

        const reportsWithEmployeeNames = timeReportsResponse.data.map(report => {
          const employee = employeesResponse.data.find(emp => emp.id === report.employee.id);
          return { ...report, employeeName: employee ? employee.name : 'Unknown' };
        });

        setTimeReports(reportsWithEmployeeNames);
      } catch (error) {
        console.error('Failed to fetch time reports or employees:', error);
      }
    };

    fetchTimeReports();
  }, []);

  const toggleApproval = async (id: number, isApproved: boolean) => {
    if (userRole !== 'admin') return; // Only admins can approve or disapprove reports

    try {
      await axios.patch(`${API_BASE_URL}/api/time-reports/approve/${id}`, { isApproved: !isApproved });
      setTimeReports(timeReports.map(report => report.id === id ? { ...report, isApproved: !isApproved } : report));
    } catch (error) {
      console.error('Failed to update approval status:', error);
    }
  };

  const deleteTimeReport = async (id: number) => {
    if (userRole !== 'admin') return; // Only admins can delete reports

    try {
      await axios.delete(`${API_BASE_URL}/api/time-reports/${id}`);
      setTimeReports(timeReports.filter(report => report.id !== id));
    } catch (error) {
      console.error('Failed to delete time report:', error);
    }
  };

  const approvedReports = timeReports.filter(report => report.isApproved);
  const nonApprovedReports = timeReports.filter(report => !report.isApproved);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Time Reports</h1>
      <h2 className="text-2xl font-bold mb-2">Approved Reports</h2>
      {approvedReports.length > 0 ? (
        <TimeReportList timeReports={approvedReports} toggleApproval={toggleApproval} deleteTimeReport={deleteTimeReport} userRole={userRole} />
      ) : (
        <p>No approved reports found.</p>
      )}
      <h2 className="text-2xl font-bold mb-2">Non-Approved Reports</h2>
      {nonApprovedReports.length > 0 ? (
        <TimeReportList timeReports={nonApprovedReports} toggleApproval={toggleApproval} deleteTimeReport={deleteTimeReport} userRole={userRole} />
      ) : (
        <p>No non-approved reports found.</p>
      )}
    </div>
  );
};

export default TimeReportListPage;
