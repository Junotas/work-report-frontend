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
}

const TimeReportList: React.FC<TimeReportListProps> = ({ timeReports, toggleApproval }) => {
  return (
    <ul className="list-none p-0">
      {timeReports.map((report) => (
        <li key={report.id} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200">
          <span>{`Report ID: ${report.id}, Employee: ${report.employeeName}`}</span>
          <span>{`From: ${report.startTime} To: ${report.endTime}`}</span>
          <button
            onClick={() => toggleApproval(report.id, report.isApproved)}
            className={`px-3 py-1 rounded ${report.isApproved ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white`}
          >
            {report.isApproved ? 'Disapprove' : 'Approve'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TimeReportList;
