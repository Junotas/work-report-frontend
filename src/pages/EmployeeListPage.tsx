import React, { useState } from 'react';
import { useEmployees } from '../useEmployees';
import EmployeeList from '../components/EmployeeList';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import { FaPlus, FaSync, FaEye, FaEyeSlash } from 'react-icons/fa';

const EmployeeListPage: React.FC = () => {
  const { isLoading, error, data: employees, refetch } = useEmployees();
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeeIsAdmin, setNewEmployeeIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const handleAddEmployee = async () => {
    const newEmployee = {
      name: newEmployeeName,
      email: newEmployeeEmail,
      isAdmin: newEmployeeIsAdmin,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/employees`, newEmployee);
      refetch();
      setNewEmployeeName('');
      setNewEmployeeEmail('');
      setNewEmployeeIsAdmin(false);
      setShowAddEmployee(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleRemoveEmployee = async (employeeId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/employees/${employeeId}`);
      refetch();
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRefresh = () => {
    refetch();
  };

  const toggleAddEmployee = () => {
    setShowAddEmployee(!showAddEmployee);
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error.message}</div>;

  const filteredEmployees = employees?.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminEmployees = filteredEmployees?.filter(employee => employee.isAdmin);
  const nonAdminEmployees = filteredEmployees?.filter(employee => !employee.isAdmin);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Employee List</h1>
        <Button
          onClick={toggleAddEmployee}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
          variant="contained"
          startIcon={showAddEmployee ? <FaEyeSlash /> : <FaEye />}
        >
          {showAddEmployee ? 'Hide Add Employee' : 'Show Add Employee'}
        </Button>
      </header>
      {showAddEmployee && (
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
              startIcon={<FaPlus />}
            >
              Add Employee
            </Button>
            <Button
              onClick={handleRefresh}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              variant="contained"
              startIcon={<FaSync />}
            >
              Refresh List
            </Button>
          </div>
        </div>
      )}
      <TextField
        label="Search Employees"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
        fullWidth
      />
      <h2 className="text-2xl font-bold mb-2">Admin Employees</h2>
      {adminEmployees && (
        <EmployeeList employees={adminEmployees} onRemoveEmployee={handleRemoveEmployee} />
      )}
      <h2 className="text-2xl font-bold mb-2">Non-Admin Employees</h2>
      {nonAdminEmployees && (
        <EmployeeList employees={nonAdminEmployees} onRemoveEmployee={handleRemoveEmployee} />
      )}
    </div>
  );
};

export default EmployeeListPage;
