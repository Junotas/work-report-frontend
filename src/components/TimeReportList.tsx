import React from 'react';
import dayjs from 'dayjs'; // Importing dayjs for date formatting

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
}

const TimeReportList: React.FC<TimeReportListProps> = ({ timeReports, toggleApproval, deleteTimeReport }) => {
  return (
    <ul className="list-none p-0">
      {timeReports.map((report) => (
        <li key={report.id} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200">
          <span>{`Report ID: ${report.id}, Employee: ${report.employeeName || 'Unknown'}`}</span>
          <span>{`From: ${dayjs(report.startTime).format('DD/MM/YYYY hh:mm')} To: ${dayjs(report.endTime).format('DD/MM/YYYY hh:mm')}`}</span>
          <button onClick={() => toggleApproval(report.id, report.isApproved)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
            {report.isApproved ? 'Disapprove' : 'Approve'}
          </button>
          <button onClick={() => deleteTimeReport(report.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TimeReportList;
