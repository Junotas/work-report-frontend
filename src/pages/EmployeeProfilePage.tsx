import React from 'react';
import { useParams } from 'react-router-dom';
import { useEmployees } from '../useEmployees';
import EmployeeProfile from '../components/EmployeeProfile';

interface EmployeeProfilePageProps {
  userRole: 'admin' | 'user';
}

const EmployeeProfilePage: React.FC<EmployeeProfilePageProps> = ({ userRole }) => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { isLoading, error, data: employees } = useEmployees();

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error.message}</div>;

  const employee = employees?.find(emp => emp.id === Number(employeeId));

  if (!employee) return <div className="container">Employee not found</div>;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Employee Profile</h1>
      </header>
      <main>
        <EmployeeProfile employee={employee} userRole={userRole} />
      </main>
    </div>
  );
};

export default EmployeeProfilePage;
