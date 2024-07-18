import React from 'react';

interface ProfilePageProps {
  userRole: 'admin' | 'user';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userRole }) => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>
      <main>
        <p>This is the profile page. not much to see here tho......</p>
        {userRole === 'admin' && (
          <div>
            <h2 className="text-2xl font-bold mt-4">Admin Actions</h2>
            <ul className="list-disc ml-5">
              <li>Manage Employees</li>
              <li>View Reports</li>
              <li>Approve/Disapprove Time Reports</li>
            </ul>
          </div>
        )}
        {userRole === 'user' && (
          <div>
            <h2 className="text-2xl font-bold mt-4">User Actions</h2>
            <ul className="list-disc ml-5">
              <li>Submit Time Reports</li>
              <li>View Submitted Reports</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
