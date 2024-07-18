import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import dayjs from 'dayjs';

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
  userRole: 'admin' | 'user';
}

const dateFormat = "YYYY-MM-DDTHH:mm:ss";

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee, userRole }) => {
  const { control, handleSubmit } = useForm<TimeReport>();

  const onSubmit: SubmitHandler<TimeReport> = async (data) => {
    if (!data.startTime || !data.endTime) {
      alert('Please select both start and end times.');
      return;
    }

    const reportData = {
      employeeId: employee.id,
      startTime: dayjs(data.startTime).format(dateFormat),
      endTime: dayjs(data.endTime).format(dateFormat),
      isApproved: false,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/time-reports`, reportData);
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
      <p>ID: {employee.id}</p>

      {userRole === 'user' && (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-2">Report Hours Worked</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    label="Start date"
                    // @ts-expect-error: Type error from controller and datetimepicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    // @ts-expect-error: Type error from controller and datetimepicker
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    label="End date"
                    // @ts-expect-error: Type error from controller and datetimepicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    // @ts-expect-error: Type error from controller and datetimepicker
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit Time Report
              </Button>
            </form>
          </LocalizationProvider>
        </>
      )}
    </div>
  );
};

export default EmployeeProfile;
