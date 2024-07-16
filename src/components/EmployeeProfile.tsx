import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

interface Employee {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface TimeReport {
  startTime: string;  
  endTime: string;
}

interface EmployeeProfileProps {
  employee: Employee;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee }) => {
  const { control, handleSubmit } = useForm<TimeReport>();

  const onSubmit: SubmitHandler<TimeReport> = async (data) => {
    const reportData = {
      employeeId: employee.id,
      startTime: data.startTime,
      endTime: data.endTime,
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

      <h3 className="text-xl font-semibold mt-6 mb-2">Report Hours Worked</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Start Time"
              type="text"
              fullWidth
            />
          )}
        />
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="End Time"
              type="text"
              fullWidth
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Time Report
        </Button>
      </form>
    </div>
  );
};

export default EmployeeProfile;
