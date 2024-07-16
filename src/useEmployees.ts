import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

interface Employee {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/employees`);
  return response.data;
};

export const useEmployees = (): UseQueryResult<Employee[], Error> => {
  return useQuery<Employee[], Error>({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    initialData: [],
  });
};
