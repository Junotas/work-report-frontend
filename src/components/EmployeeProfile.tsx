import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import dayjs from 'dayjs';
import { toastError, toastSuccess } from '../components/toastUtils';
import { FaPlus } from "react-icons/fa";


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
    <Card className="p-4 shadow-lg">
      <CardContent>
        <Typography variant="h4" component="div" className="mb-4">
          {employee.name}
        </Typography>
        <Typography variant="body1" className="mb-2">
          <strong>Email:</strong> {employee.email}
        </Typography>
        <Typography variant="body1" className="mb-2">
          <strong>Admin:</strong> {employee.isAdmin ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body1" className="mb-4">
          <strong>ID:</strong> {employee.id}
        </Typography>

        {userRole === 'user' && (
          <>
            <Typography variant="h5" component="div" className="mt-6 mb-4">
              Report Hours Worked
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Box display="flex" flexDirection="column" alignItems="center" className="space-y-4 ml-4">
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            className="bg-white rounded"
                            error={!!errors.startTime}
                            helperText={errors.startTime ? errors.startTime.message : ''}
                          />
                        )}
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            className="bg-white rounded"
                            error={!!errors.endTime}
                            helperText={errors.endTime ? errors.endTime.message : ''}
                          />
                        )}
                      />
                    )}
                  />
                </Box>
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    startIcon={<FaPlus />}
                  >
                    Submit Time Report
                  </Button>
                </Box>
              </form>
            </LocalizationProvider>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile;
