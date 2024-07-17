import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

interface Employee {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface EmployeeListProps {
  employees: Employee[] | null; 
  onRemoveEmployee: (employeeId: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onRemoveEmployee }) => {
  if (!employees || !Array.isArray(employees)) {
    return <div>No employees available</div>;
  }

  return (
    <ul className="list-none p-0">
      {employees.map((employee) => (
        <li key={employee.id} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
          <Link to={`/employees/${employee.id}`} className="text-blue-500 hover:underline">{employee.name}</Link>
          <button
            onClick={() => onRemoveEmployee(employee.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
