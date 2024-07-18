import React from 'react';
import dayjs from 'dayjs';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

interface TimeReport {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  employeeName?: string;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

interface TimeReportListProps {
  timeReports: TimeReport[];
  toggleApproval: (id: number, isApproved: boolean) => void;
  deleteTimeReport: (id: number) => void;
  userRole: 'admin' | 'user';
}

const TimeReportList: React.FC<TimeReportListProps> = ({ timeReports, toggleApproval, deleteTimeReport, userRole }) => {
  return (
    <ul className="list-none p-0">
      {timeReports.map((report) => {
        const startTime = dayjs(report.startTime);
        const endTime = dayjs(report.endTime);
        const hoursWorked = endTime.diff(startTime, 'hour', true).toFixed(2); // Calculate hours worked

        return (
          <li key={report.id} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200">
            <span>{`Report ID: ${report.id}, Employee: ${report.employeeName || 'Unknown'}`}</span>
            <span>{`From: ${startTime.format('DD/MM/YYYY hh:mm A')} To: ${endTime.format('DD/MM/YYYY hh:mm A')} (${hoursWorked} hours)`}</span>
            <div className="flex space-x-2">
              {userRole === 'admin' && (
                <>
                  <button onClick={() => toggleApproval(report.id, report.isApproved)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                    {report.isApproved ? <FaTimes /> : <FaCheck />}
                  </button>
                  <button onClick={() => deleteTimeReport(report.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TimeReportList;
