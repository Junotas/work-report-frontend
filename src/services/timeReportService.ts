import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

interface TimeReport {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

// Fetch all time reports
export const fetchTimeReports = async (): Promise<TimeReport[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/time-reports`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch time reports:', error);
    throw new Error('Failed to fetch time reports');
  }
};

// Function to approve or disapprove a time report
export const updateApprovalStatus = async (id: number, isApproved: boolean): Promise<void> => {
  try {
    await axios.patch(`${API_BASE_URL}/api/time-reports/approve/${id}`, { isApproved });
  } catch (error) {
    console.error('Failed to update approval status:', error);
    throw new Error('Failed to update approval status');
  }
};
