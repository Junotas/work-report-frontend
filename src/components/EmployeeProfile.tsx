import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import dayjs from 'dayjs';
import { toastError, toastSuccess } from '../components/toastUtils';

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
  const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<TimeReport>();

  const onSubmit: SubmitHandler<TimeReport> = async (data) => {
    if (!data.startTime || !data.endTime) {
      toastError('Please select both start and end times.');
      return;
    }

    const startTime = dayjs(data.startTime);
    const endTime = dayjs(data.endTime);

    if (endTime.isBefore(startTime)) {
      setError('endTime', {
        type: 'manual',
        message: 'End time must be after start time',
      });
      toastError('End time must be after start time.');
      return;
    }

    const reportData = {
      employeeId: employee.id,
      startTime: startTime.format(dateFormat),
      endTime: endTime.format(dateFormat),
      isApproved: false,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/time-reports`, reportData);
      toastSuccess('Time report submitted successfully!');
    } catch (error) {
      console.error('Error submitting time report:', error);
      toastError('Failed to submit time report.');
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
                    onChange={(date) => {
                      field.onChange(date);
                      clearErrors('endTime');
                    }}
                    // @ts-expect-error: Type error from controller and datetimepicker
                    renderInput={(params) => <TextField {...params} fullWidth error={!!errors.startTime} helperText={errors.startTime ? errors.startTime.message : ''} />}
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
                    onChange={(date) => {
                      field.onChange(date);
                      clearErrors('endTime');
                    }}
                    // @ts-expect-error: Type error from controller and datetimepicker
                    renderInput={(params) => <TextField {...params} fullWidth error={!!errors.endTime} helperText={errors.endTime ? errors.endTime.message : ''} />}
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
