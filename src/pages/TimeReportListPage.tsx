import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import TimeReportList from '../components/TimeReportList';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { toastError, toastSuccess } from '../components/toastUtils';

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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteReportId, setDeleteReportId] = useState<number | null>(null);

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
        toastError('Failed to fetch time reports or employees.');
      }
    };

    fetchTimeReports();
  }, []);

  const toggleApproval = async (id: number, isApproved: boolean) => {
    if (userRole !== 'admin') return; // Only admins can approve or disapprove reports

    try {
      await axios.patch(`${API_BASE_URL}/api/time-reports/approve/${id}`, { isApproved: !isApproved });
      setTimeReports(timeReports.map(report => report.id === id ? { ...report, isApproved: !isApproved } : report));
      toastSuccess('Time report approval status updated successfully!');
    } catch (error) {
      console.error('Failed to update approval status:', error);
      toastError('Failed to update approval status.');
    }
  };

  const handleDeleteTimeReport = (id: number) => {
    if (userRole !== 'admin') return; // Only admins can delete reports

    setDeleteReportId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteTimeReport = async () => {
    if (deleteReportId !== null) {
      try {
        await axios.delete(`${API_BASE_URL}/api/time-reports/${deleteReportId}`);
        setTimeReports(timeReports.filter(report => report.id !== deleteReportId));
        setDeleteConfirmOpen(false);
        setDeleteReportId(null);
        toastSuccess('Time report deleted successfully!');
      } catch (error) {
        console.error('Failed to delete time report:', error);
        toastError('Failed to delete time report.');
      }
    }
  };

  const approvedReports = timeReports.filter(report => report.isApproved);
  const nonApprovedReports = timeReports.filter(report => !report.isApproved);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Time Reports</h1>
      <h2 className="text-2xl font-bold mb-2">Approved Reports</h2>
      {approvedReports.length > 0 ? (
        <TimeReportList timeReports={approvedReports} toggleApproval={toggleApproval} deleteTimeReport={handleDeleteTimeReport} userRole={userRole} />
      ) : (
        <p>No approved reports found.</p>
      )}
      <h2 className="text-2xl font-bold mb-2">Non-Approved Reports</h2>
      {nonApprovedReports.length > 0 ? (
        <TimeReportList timeReports={nonApprovedReports} toggleApproval={toggleApproval} deleteTimeReport={handleDeleteTimeReport} userRole={userRole} />
      ) : (
        <p>No non-approved reports found.</p>
      )}

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this time report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTimeReport} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeReportListPage;
