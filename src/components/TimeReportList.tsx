import React from 'react';

interface TimeReport {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

interface TimeReportListProps {
  timeReports: TimeReport[];
}

const TimeReportList: React.FC<TimeReportListProps> = ({ timeReports }) => {
  return (
    <ul className="list-none p-0">
      {timeReports.map((report) => (
        <li key={report.id} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200">
          <span>{`Report ID: ${report.id}, Employee ID: ${report.employeeId}`}</span>
          <span>{`From: ${report.startTime} To: ${report.endTime}`}</span>
          <span>{`Status: ${report.isApproved ? 'Approved' : 'Pending'}`}</span>
        </li>
      ))}
    </ul>
  );
};

export default TimeReportList;
