import React from 'react';

interface TimeReport {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  isApproved: boolean;
  employeeName?: string;
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
          <span>{`From: ${report.startTime || 'null'} To: ${report.endTime || 'null'}`}</span>
          <button
            onClick={() => toggleApproval(report.id, report.isApproved)}
            className={`bg-${report.isApproved ? 'red' : 'green'}-500 text-white px-3 py-1 rounded hover:bg-${report.isApproved ? 'red' : 'green'}-700`}
          >
            {report.isApproved ? 'Disapprove' : 'Approve'}
          </button>
          <button
            onClick={() => deleteTimeReport(report.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TimeReportList;
