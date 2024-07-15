import React, { useState } from 'react';
import { useEmployees } from '../useEmployees';
import EmployeeList from '../components/EmployeeList';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const EmployeeListPage: React.FC = () => {
  const { isLoading, error, data: employees, refetch } = useEmployees();
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeeIsAdmin, setNewEmployeeIsAdmin] = useState(false);

  const handleAddEmployee = async () => {
    const newEmployee = {
      name: newEmployeeName,
      email: newEmployeeEmail,
      isAdmin: newEmployeeIsAdmin,
    };

    try {
      await axios.post('/api/employees', newEmployee);
      refetch();
      setNewEmployeeName('');
      setNewEmployeeEmail('');
      setNewEmployeeIsAdmin(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleRemoveEmployee = async (employeeId: number) => {
    try {
      await axios.delete(`/api/employees/${employeeId}`);
      refetch();
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Employee List</h1>
      </header>
      <main>
        <div className="mb-4">
          <TextField
            label="Name"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            className="mb-2"
            fullWidth
          />
          <TextField
            label="Email"
            value={newEmployeeEmail}
            onChange={(e) => setNewEmployeeEmail(e.target.value)}
            className="mb-2"
            fullWidth
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newEmployeeIsAdmin}
              onChange={(e) => setNewEmployeeIsAdmin(e.target.checked)}
              className="mr-2"
            />
            Admin
          </label>
          <div className="flex space-x-2">
            <Button
              onClick={handleAddEmployee}
              disabled={!newEmployeeName || !newEmployeeEmail}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
              variant="contained"
            >
              Add Employee
            </Button>
            <Button
              onClick={handleRefresh}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              variant="contained"
            >
              Refresh List
            </Button>
          </div>
        </div>
        {employees && (
          <EmployeeList employees={employees} onRemoveEmployee={handleRemoveEmployee} />
        )}
      </main>
    </div>
  );
};

export default EmployeeListPage;
