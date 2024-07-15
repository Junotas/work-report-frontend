import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get('/api/employees');
  return response.data;
};

export const useEmployees = (): UseQueryResult<Employee[], Error> => {
  return useQuery<Employee[], Error>({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
};
