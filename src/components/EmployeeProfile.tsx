import React, { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface TimeReport {
  startTime: Date | null;
  endTime: Date | null;
}

interface EmployeeProfileProps {
  employee: Employee;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee }) => {
  const [timeReport, setTimeReport] = useState<TimeReport>({ startTime: null, endTime: null });

  const handleStartTimeChange = (date: Date | null) => {
    setTimeReport((prev) => ({ ...prev, startTime: date }));
  };

  const handleEndTimeChange = (date: Date | null) => {
    setTimeReport((prev) => ({ ...prev, endTime: date }));
  };

  const handleSubmit = async () => {
    if (!timeReport.startTime || !timeReport.endTime) {
      alert('Please select both start and end times.');
      return;
    }

    const reportData = {
      employeeId: employee.id,
      startTime: timeReport.startTime.toISOString(),
      endTime: timeReport.endTime.toISOString(),
      isApproved: false,
    };

    try {
      await axios.post('/api/time-reports', reportData);
      alert('Time report submitted successfully!');
    } catch (error) {
      console.error('Error submitting time report:', error);
      alert('Failed to submit time report.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
      <p>Email: {employee.email}</p>
      <p>Admin: {employee.isAdmin ? 'Yes' : 'No'}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Report Hours Worked</h3>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="mb-4">
          <DateTimePicker
            label="Start Time"
            value={timeReport.startTime}
            onChange={handleStartTimeChange}
            renderInput={(props) => <TextField {...props} fullWidth />}
          />
        </div>
        <div className="mb-4">
          <DateTimePicker
            label="End Time"
            value={timeReport.endTime}
            onChange={handleEndTimeChange}
            renderInput={(props) => <TextField {...props} fullWidth />}
          />
        </div>
      </LocalizationProvider>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Time Report
      </Button>
    </div>
  );
};

export default EmployeeProfile;
